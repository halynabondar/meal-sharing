import styles from './Form.module.css';

function Modal({ active, setActive, children }) {
    return (
        <>
            <div className={active ? `${styles.modal} ${styles.active}` : styles.modal} onClick={() => setActive(false)}>
                <div className={active ? `${styles.modalContent} ${styles.active}` : styles.modalContent} onClick={event => event.stopPropagation()}>
                    {children}
                </div>
            </div>
        </>
    );
}

export default Modal;
