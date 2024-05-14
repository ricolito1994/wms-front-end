import { Modal } from 'antd';
interface DialogBoxProps {
    isOpen : boolean,
    setIsOpen : Function,
    modalTitle: String,
    form : any | null,
    handleClose: Function | null,
    children : any,
}
const DialogBox = ({
    isOpen, 
    setIsOpen, 
    modalTitle, 
    form,
    handleClose,
    children
} : DialogBoxProps) => {
    const handleOk = () => {
        //setIsOpen(!isOpen)
        if(form) form.submit()
    }
    const handleCancel  = () => {
        if(handleClose) handleClose();
        setIsOpen(!isOpen)
    }
    return (
        <>
            <Modal
                title={modalTitle}
                open={isOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {children}
            </Modal>
        </>
    )
}
export default DialogBox;