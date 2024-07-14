import { Component } from "react";
import s from './Modal.module.scss';
import { createPortal } from "react-dom";

export class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = (e) => {
    let condition = e.code === 'Escape';
    if(condition) {
      this.props.toggleModal();
    }
  }

  handleClose = (e) => {
    if(e.currentTarget === e.target) {
      this.props.toggleModal();
    }
  }

  render() {
    const {children} = this.props;
    return createPortal(
      <div className={s.backDrop} onClick={this.handleClose}>
         <div className={s.content}>
            {children}
         </div>
      </div>,
      document.getElementById('modalRoot')
    );
  }
}