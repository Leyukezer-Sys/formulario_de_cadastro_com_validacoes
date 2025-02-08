import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, CheckBox } from 'react-native';
import Toast from 'react-native-toast-message';

const Etapa1 = ({ navigation }) => {
  const [form, setForm] = useState({
    nomeCompleto: '',
    dataNascimento: '',
    cpf: '',
    telefoneFixo: '',
    celular: '',
    nomePai: '',
    nomeMae: '',
  });

  const [errors, setErrors] = useState({});
  const [isMinor, setIsMinor] = useState(false);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };
  
  const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpf)) return false;
    let sum = 0, remainder;
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    remainder = (remainder === 10 || remainder === 11) ? 0 : remainder;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    remainder = (remainder === 10 || remainder === 11) ? 0 : remainder;
    return remainder === parseInt(cpf.substring(10, 11));
  };

  const validateEtapa1 = () => {
    let valid = true;
    let errors = {};
    let errorMessages = [];

    if (!form.nomeCompleto) {
      errors.nomeCompleto = 'Nome Completo é obrigatório';
      errorMessages.push(errors.nomeCompleto);
      valid = false;
    }else if (form.nomeCompleto.trim().length < 4) {
        errors.nomeCompleto = 'Nome Precisa ter no mínimo 5 Caracteres';
        errorMessages.push(errors.nomeCompleto);
        valid = false;
    }
    if (!form.dataNascimento) {
      errors.dataNascimento = 'Data de Nascimento é obrigatória';
      errorMessages.push(errors.dataNascimento);
      valid = false;
    }
    if (!validateCPF(form.cpf)) {
        errors.cpf = 'CPF inválido';
        errorMessages.push(errors.cpf);
        valid = false;
    }
    if (!form.telefoneFixo.match(/^\(\d{2}\) \d{4}\-\d{4}$/)) {
        if (!form.telefoneFixo.match(/^\d{2} \d{4}\-\d{4}$/)) {
            if (!form.telefoneFixo.match(/^\d{10}$/)) {
                errors.telefoneFixo = 'Telefone Celular inválido';
                errorMessages.push(errors.telefoneFixo);
                valid = false;
              }
          } 
    }
    if (!form.celular.match(/^\(\d{2}\) \d{5}\-\d{4}$/)) {
        if (!form.celular.match(/^\d{2} \d{5}\-\d{4}$/)) {
            if (!form.celular.match(/^\d{11}$/)) {
                errors.celular = 'Celular inválido';
                errorMessages.push(errors.celular);
                valid = false;
              }
          }
    } 
    if (isMinor) {
      if (!form.nomePai) {
        errors.nomePai = 'Nome do Pai é obrigatório para menores de 18 anos';
        errorMessages.push(errors.nomePai);
        valid = false;
      }
      if (!form.nomeMae) {
        errors.nomeMae = 'Nome da Mãe é obrigatório para menores de 18 anos';
        errorMessages.push(errors.nomeMae);
        valid = false;
      }
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
    if (validateEtapa1()) {
      navigation.navigate('Formulario ', { form });
    } else {
      Alert.alert('Erro ao continuar', 'Por favor, corrija os erros antes de continuar.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome Completo</Text>
      <TextInput style={styles.input} placeholder="Nome Completo" onChangeText={value => handleInputChange('nomeCompleto', value)} />
      

      <Text style={styles.label}>Data de Nascimento</Text>
      <TextInput style={styles.input} keyboardType="numbers-and-punctuation" placeholder="Data de Nascimento" onChangeText={value => handleInputChange('dataNascimento', value)} />
      

      <Text style={styles.label}>CPF</Text>
      <TextInput style={styles.input} keyboardType="numbers-and-punctuation" placeholder="CPF" onChangeText={value => handleInputChange('cpf', value)} />
      

      <Text style={styles.label}>Telefone Fixo (com DDD)</Text>
      <TextInput style={styles.input} keyboardType="numbers-and-punctuation" placeholder="Telefone Fixo (com DDD)" onChangeText={value => handleInputChange('telefoneFixo', value)} />
      

      <Text style={styles.label}>Celular (com DDD)</Text>
      <TextInput style={styles.input} keyboardType="numbers-and-punctuation" placeholder="Celular (com DDD)" onChangeText={value => handleInputChange('celular', value)} />
      

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isMinor}
          onValueChange={setIsMinor}
        />
        <Text style={styles.labelCheck}>Declaro que sou menor de 18 anos e preciso fornecer informações adicionais.</Text>
      </View>

      {isMinor && (
        <>
          <Text style={styles.label}>Nome do Pai</Text>
          <TextInput style={styles.input} placeholder="Nome do Pai" onChangeText={value => handleInputChange('nomePai', value)} />
         

          <Text style={styles.label}>Nome da Mãe</Text>
          <TextInput style={styles.input} placeholder="Nome da Mãe" onChangeText={value => handleInputChange('nomeMae', value)} />
          
        </>
      )}

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
  labelCheck: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontWeight: 'normal',
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
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default Etapa1;
