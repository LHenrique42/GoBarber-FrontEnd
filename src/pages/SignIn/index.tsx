import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const handleSubmited = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('Email obrigatório')
                    .email('Informe um email válido'),
                password: Yup.string().required('Senha obrigatória'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
        } catch (error) {
            const errors = getValidationErrors(error);
            formRef.current?.setErrors(errors);
        }
    }, []);
    return (
        <Container>
            <Content>
                <img src={logo} alt="GoBarber" />

                <Form ref={formRef} onSubmit={handleSubmited}>
                    <h1>Faça seu logon</h1>

                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input
                        name="password"
                        icon={FiLock}
                        type="password"
                        placeholder="Senha"
                    />

                    <Button type="submit">Entrar</Button>

                    <a href="forgot">Esqueci minha senha</a>
                </Form>
                <a href="signin">
                    <FiLogIn />
                    Criar conta
                </a>
            </Content>
            <Background />
        </Container>
    );
};

export default SignIn;
