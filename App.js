import React from 'react';
import { SafeAreaView, Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import etapa1 from './etapa1';
import etapa2 from './etapa2';
import etapa3 from './etapa3';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Iniciar Formulário" onPress={() => navigation.navigate('Formulario')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Formulario" component={etapa1} />
        <Stack.Screen name="Formulario " component={etapa2} />
        <Stack.Screen name="Formulario  " component={etapa3} />
      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

export default App;
