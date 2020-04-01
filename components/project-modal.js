import theme from '../lib/theme'
import { IconButton } from 'theme-ui'
import { XCircle } from 'react-feather'
import dynamic from 'next/dynamic'
import Modal from 'react-modal'
import ScrollLock from 'react-scrolllock'

Modal.setAppElement('#__next')

const ProjectSheet = dynamic(() => import('./project-sheet'))

export default ({ open: [open, setOpen], ...props }) => [
  <ScrollLock key="lock" />,
  <Modal
    key="modal"
    isOpen={open}
    contentLabel={props.name}
    onRequestClose={() => setOpen(false)}
    shouldCloseOnOverlayClick
    shouldCloseOnEsc
    shouldFocusAfterRender
  >
    <ProjectSheet
      {...props}
      actions={
        <IconButton onClick={() => setOpen(false)}>
          <XCircle size={32} />
        </IconButton>
      }
    />
  </Modal>,
  <style key="style">{`
    .ReactModal__Overlay {
      background-color: rgba(0, 0, 0, 0.625) !important;
      -webkit-backdrop-filter: blur(4px);
      backdrop-filter: blur(4px);
      display: flex;
      justify-content: center;
      align-items: end;
    }

    @keyframes modal-narrow {
      0% { transform: translateY(-100%); }
      87.5% { transform: translateY(-2.5%); }
      100% { transform: translateY(0%); }
    }
    @keyframes modal-wide {
      0% { transform: translateY(-100%) scale(0); }
      87.5% { transform: translateY(-2.5%) scaleY(1.025) scaleX(1.0625); }
      100% { transform: translateY(0%) scale(1); }
    }
    .ReactModal__Content {
      background-color: ${theme.colors.elevated} !important;
      max-width: ${theme.sizes.layout}px !important;
      padding: 0 !important;
      border: 0 !important;
      overflow-y: scroll;
      max-height: 100%;
      border-radius: ${theme.radii.extra}px !important;
      box-shadow: ${theme.shadows.elevated};
      margin-top: ${theme.space[4]}px !important;
      top: auto !important;
      left: auto !important;
      right: auto !important;
      bottom: auto !important;
      will-change: transform;
      transform-origin: center bottom;
      animation: modal-narrow ease-in 0.5s !important;
    }
    @media screen and (min-width: ${theme.breakpoints[1]}) {
      .ReactModal__Content {
        animation: modal-wide ease-in 0.5s !important;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .ReactModal__Content {
        animation: none !important;
      }
    }
  `}</style>
]
