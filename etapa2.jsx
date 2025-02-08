import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

const Etapa2 = ({ navigation, route }) => {
  const [form, setForm] = useState({
    ...route.params.form,
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    cidade: '',
    estado: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const validateEtapa2 = () => {
    let valid = true;
    let errors = {};
    let errorMessages = [];

    if (!form.cep.match(/^\d{5}-\d{3}$/) && !form.cep.match(/^\d{8}$/)) {
      errors.cep = 'CEP inválido';
      errorMessages.push(errors.cep);
      valid = false;
    }
    if (!form.endereco) {
      errors.endereco = 'Endereço é obrigatório';
      errorMessages.push(errors.endereco);
      valid = false;
    }
    if (!form.numero) {
      errors.numero = 'Número é obrigatório';
      errorMessages.push(errors.numero);
      valid = false;
    }
    if (!form.cidade) {
      errors.cidade = 'Cidade é obrigatória';
      errorMessages.push(errors.cidade);
      valid = false;
    }
    if (!form.estado) {
      errors.estado = 'Estado é obrigatório';
      errorMessages.push(errors.estado);
      valid = false;
    }

    if (errorMessages.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Erros de Validação',
        text2: errorMessages.join('\n'),
      });
    }

    setErrors(errors);
    return valid;
  };

  const handleNext = () => {
    if (validateEtapa2()) {
      navigation.navigate('Formulario  ', { form });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Erro ao continuar',
        text2: 'Por favor, corrija os erros antes de continuar.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>CEP</Text>
      <TextInput style={styles.input} keyboardType="numbers-and-punctuation" placeholder="CEP" onChangeText={value => handleInputChange('cep', value)} />

      <Text style={styles.label}>Endereço</Text>
      <TextInput style={styles.input} placeholder="Endereço" onChangeText={value => handleInputChange('endereco', value)} />

      <Text style={styles.label}>Número</Text>
      <TextInput style={styles.input} keyboardType="numbers-and-punctuation" placeholder="Número" onChangeText={value => handleInputChange('numero', value)} />

      <Text style={styles.label}>Complemento (opcional)</Text>
      <TextInput style={styles.input} placeholder="Complemento (opcional)" onChangeText={value => handleInputChange('complemento', value)} />

      <Text style={styles.label}>Cidade</Text>
      <TextInput style={styles.input} placeholder="Cidade" onChangeText={value => handleInputChange('cidade', value)} />

      <Text style={styles.label}>Estado</Text>
      <TextInput style={styles.input} placeholder="Estado" onChangeText={value => handleInputChange('estado', value)} />

      <Button title="Próximo" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Etapa2;
