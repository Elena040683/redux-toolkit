import { Component, createRef } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import './RemoveItem.scss';
import { GadgetWindow } from './WindowElem';
import { connect } from 'react-redux';
import {deleteProduct} from '../../redux/products/actions';

class DeleteButton extends Component {
  state = {
  // Классовый компонент получает от родителя начальное 
  // состояние через объект this.props т.к. один экземпляр виджета может 
  // быть с открытым окном, второй - с закрытым.
    isOpen: this.props.isOpen,
    // isOpen: false,
  };
  // получаем доступ к текущему элементу через метод библиотеки React createRef()
  ref = createRef();

  // создаем метод изменения свойства видимости в стейте
  toggleState = () => {
    //  если текущее значение true выходим из метода
    if (this.state.isOpen) return;
    this.setState(prev => ({
      isOpen: !prev.isOpen,
    }));
    // фокусируемся на текущем элементе
    this.ref.current.focus();
  };

  keydownHandler = event => {
    // при фокусе табом на кнопках виджета
    // закрывает виджет по нажатию на 'Enter' || 'Escape'
    if (event.key === 'Enter' || event.key === 'Escape') {
      this.toggleState();
    }
  };

  handleClick = () => this.setState({ isOpen: false });
  
// Добавляем обработчик клика для кнопки Delete и вызываем полученный через проп
// метод удаления продукта и передаем полученный id продукта

  handleDelete = () => {
    //this.props.onDelete(this.props.id); // раньше получали метод от родителя
    this.props.onDeleteProduct(this.props.id); // 
    this.setState({ isOpen: false });
  }
  
  render() {
    // console.log(this.props.text);

    // деструктуризировать стейт и методы
    const { isOpen } = this.state;
    const { ref, keydownHandler, toggleState, handleClick, handleDelete } = this;
    return (
      <Flipper flipKey={isOpen} spring="stiff" stagger>
       
        {isOpen ? (
          <GadgetWindow
            // переименовано имя пропа для передачи в компонент виджета ссылки на дом-узел
            unitRef={ref}
            isOpen={isOpen}
            toggleState={toggleState}
            keydownHandler={keydownHandler}
            handleClick={handleClick}
            // textObj={this.props.text}
            // передам обработчик клика для кнопки Delete
            handleDelete={handleDelete}
          />
        ) : (
          <Flipped flipId="wrapper">
            <div
              ref={ref}
              tabIndex={0}
              role="button"
              className="button primary"
              onClick={toggleState}
              onKeyDown={keydownHandler}
            >
              <Flipped flipId="action">
                <span className="action">Delete</span>
              </Flipped>
            </div>
          </Flipped>
         )}
      </Flipper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onDeleteProduct: (id) => dispatch(deleteProduct(id)),
})

export default connect(null, mapDispatchToProps)(DeleteButton);