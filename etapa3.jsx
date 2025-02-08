import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';

const etapa3 = ({ navigation, route }) => {
  const [form, setForm] = useState({
    ...route.params.form,
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const validateetapa3 = () => {
    let valid = true;
    let errors = {};

    if (!form.email.match(/^\S+@\S+\.\S+$/)) {
      errors.email = 'Email inválido';
      valid = false;
    }
    if (form.senha.length < 6) {
      errors.senha = 'Senha deve ter pelo menos 6 caracteres';
      valid = false;
    }
    if (form.senha !== form.confirmarSenha) {
      errors.confirmarSenha = 'Senhas não correspondem';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateetapa3()) {
      // Aqui você pode enviar os dados do formulário para o servidor ou realizar outra ação desejada
      Alert.alert('Formulário enviado com sucesso!', JSON.stringify(form));
    } else {
      Alert.alert('Erro ao enviar o formulário', 'Por favor, corrija os erros antes de enviar.');
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" onChangeText={value => handleInputChange('email', value)} />
      {errors.email && <Text>{errors.email}</Text>}

      <TextInput placeholder="Senha" secureTextEntry onChangeText={value => handleInputChange('senha', value)} />
      {errors.senha && <Text>{errors.senha}</Text>}

      <TextInput placeholder="Confirmar Senha" secureTextEntry onChangeText={value => handleInputChange('confirmarSenha', value)} />
      {errors.confirmarSenha && <Text>{errors.confirmarSenha}</Text>}

      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
};

export default etapa3;
