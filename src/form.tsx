import {FormikErrors, useFormik} from "formik";
import {Button} from "@/components/Button";
import {tableStore} from "@/store/TableStore.ts";
import {observer} from "mobx-react-lite";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

interface FormValues {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
}

const validate = (values : FormValues) => {
    const errors: FormikErrors<FormValues> = {};
    if (!values.name) errors["name"] = 'Поле "Имя" не может быть пустым';
    if (!values.height) errors["height"] = 'Поле "Рост" не может быть пустым';
    if (!values.mass) errors["mass"] = 'Поле "Масса" не может быть пустым';
    if (!values.hair_color) errors["hair_color"] = 'Поле "Цвет волос" не может быть пустым';
    if (!values.skin_color) errors["skin_color"] = 'Поле "Цвет кожи" не может быть пустым';

    return errors;
};

const FormPage = observer(() => {
    const {setData, data} = tableStore;
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    const addForm = useFormik({
        initialValues: {
            name: '',
            height: '',
            mass: '',
            hair_color: '',
            skin_color: '',
        },
        validate,
        onSubmit: (values) => {
            const newPerson = {
                id: data.length + 1,
                ...values
            }
            setData([...data, newPerson])
            localStorage.setItem('tableData', JSON.stringify([...data, newPerson]))

            addForm.resetForm();
            setShowSuccess(true);
            setTimeout(() => {
                navigate("/")
            }, 1000)
        },
    });

    return (
        <div className={'container'}>
            <form className={'form'} onSubmit={addForm.handleSubmit}>
                <h1>
                    Форма добавления персонажа
                </h1>
                <label className={'form__label'}>
                    <p className={'form__label-text'}>Введите Имя</p>
                    <input
                        type="text"
                        placeholder="Michel"
                        {...addForm.getFieldProps('name')}
                    />
                    {addForm.touched.name && addForm.errors.name ?
                        <div className={'form__label-error'}>{addForm.errors.name}</div>
                        : null}
                </label>
                <label className={'form__label'}>
                    <p className={'form__label-text'}>Введите Рост</p>
                    <input
                        type="text"
                        placeholder="150"
                        {...addForm.getFieldProps('height')}
                    />
                    {addForm.touched.height && addForm.errors.height ?
                        <div className={'form__label-error'}>{addForm.errors.height}</div>
                        : null}
                </label>
                <label className={'form__label'}>
                    <p className={'form__label-text'}>Введите Массу</p>
                    <input
                        type="text"
                        placeholder="70"
                        {...addForm.getFieldProps('mass')}
                    />
                    {addForm.touched.mass && addForm.errors.mass ?
                        <div className={'form__label-error'}>{addForm.errors.mass}</div>
                        : null}
                </label>
                <label className={'form__label'}>
                    <p className={'form__label-text'}>Введите цвет волос</p>
                    <input
                        type="text"
                        placeholder="red"
                        {...addForm.getFieldProps('hair_color')}
                    />
                    {addForm.touched.hair_color && addForm.errors.hair_color ?
                        <div className={'form__label-error'}>{addForm.errors.hair_color}</div>
                        : null}
                </label>
                <label className={'form__label'}>
                    <p className={'form__label-text'}>Введите цвет кожи</p>
                    <input
                        type="text"
                        placeholder="black"
                        {...addForm.getFieldProps('skin_color')}
                    />
                    {addForm.touched.skin_color && addForm.errors.skin_color ?
                        <div className={'form__label-error'}>{addForm.errors.skin_color}</div>
                        : null}
                </label>
                {showSuccess && <div className={'form__success'}>
                    Новый персонаж успешно добавлен в таблицу!
                </div>}
                <Button disabled={((!(addForm.isValid && addForm.dirty)) || addForm.isSubmitting)} type={'submit'}>
                    Добавить
                </Button>
            </form>
        </div>
    )
})

export default FormPage
