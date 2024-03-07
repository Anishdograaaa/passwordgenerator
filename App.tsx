// import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = Yup.object().shape({
  passwordLength:Yup.number()
  .min(4,"should be of min 4 characters")
  .max(16,"should be of max 16 characters")
  .required("Length is required")
})
export default function App() {

  const [password,setPassword] = useState('');
  const [passgenerated,setPassgenerated] = useState(false);
  const [lowercase,setlowercase] = useState(true);
  const [numbers,setNumbers] = useState(false);
  const [uppercase,setuppercase] = useState(false);
  const [symbols,setsymbols] = useState(false);

  const generatePasswordString = (passwordLength:number) =>{
     let characterlist = ""
     const uppercasechar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
     const lowercasechar = "abcdefghijklmnopqrstuvwxyz"
     const digits = "0123456789"
     const specialchars = "!@#$%^&*()"

     if(uppercase){
      characterlist += uppercasechar
     }
     if(lowercase){
      characterlist += lowercasechar
     }
     if(numbers){
      characterlist += digits
     }
     if(symbols){
      characterlist += specialchars
     }
     const passwordresult = createPassword(characterlist,passwordLength)
     setPassword(passwordresult)
     setPassgenerated(true)

  }

  const createPassword = (characters:string,passwordLength:number)=>{
     let result = '';
     for (let i = 0; i < passwordLength; i++) {
      const characterindex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterindex)
     }
     return result
  }

  const resetPassword =()=>{
      setPassword('')
      setPassgenerated(false)
      setuppercase(false)
      setlowercase(true)
      setNumbers(false)
      setsymbols(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style = {styles.appContainer}>
        <View style = {styles.formContainer}>
           <Text style={styles.title}>Password Generator</Text>
           <Formik
       initialValues={{ passwordLength:'' }}
       validationSchema = {PasswordSchema}
       onSubmit={values =>{
        console.log(values)
        generatePasswordString(+values.passwordLength)
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
         <>
           <View style={styles.inputWrapper}>
             <View style={styles.inputColumn}>
              <Text style={styles.heading}>Password Length</Text>
              {touched.passwordLength && errors.passwordLength && (
                <Text style={styles.errorText}>
                  {errors.passwordLength}
                </Text>
              )}
              
             </View>
             <TextInput style={styles.inputStyle}
                         value = {values.passwordLength}
                         onChangeText = {handleChange('passwordLength')}
                         placeholder="Ex. 8"
                         keyboardType = 'numeric'
                         />
           </View>
           <View style={styles.inputWrapper}>
             <Text style={styles.heading}>Include Lowercase</Text>
             <BouncyCheckbox
               disableBuiltInState
               isChecked={lowercase}
               onPress={()=>setlowercase(!lowercase)}
               fillColor='#29AB87'
             />
           </View>
           <View style={styles.inputWrapper}>
           <Text style={styles.heading}>Include Uppercase</Text>
             <BouncyCheckbox
               disableBuiltInState
               isChecked={uppercase}
               onPress={()=>setuppercase(!uppercase)}
               fillColor='#5DA3FA'
             />
           </View>
           <View style={styles.inputWrapper}>
           <Text style={styles.heading}>Include Numbers</Text>
             <BouncyCheckbox
               disableBuiltInState
               isChecked={numbers}
               onPress={()=>setNumbers(!numbers)}
               fillColor='#758283'
             />
           </View>
           <View style={styles.inputWrapper}>
           <Text style={styles.heading}>Include Numbers</Text>
             <BouncyCheckbox
               disableBuiltInState
               isChecked={symbols}
               onPress={()=>setsymbols(!symbols)}
               fillColor='#16213e'
             />
           </View>
           
           <View style={styles.formActions}>
              
                <TouchableOpacity
                  disabled={!isValid}
                  style={styles.primaryBtn}
                  onPress={handleSubmit}>
                  <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                </TouchableOpacity>
              
                <TouchableOpacity
                 style={styles.secondaryBtn}
                 onPress={()=>{
                  handleReset();
                  resetPassword()
                 }}
                >
                  <Text style={styles.secondaryBtnTxt}>Reset</Text>
                </TouchableOpacity>
              
              
              
           </View>
         </>
       )}
      </Formik>
        </View>
      {
        passgenerated? (
          <View style={[styles.card,styles.cardElevated]}>
             <Text style={styles.subTitle}>Result:</Text>
             <Text style={styles.description}>Long press to copy</Text>
             <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ):null
      }
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    marginTop: 30
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#16213e'
  },
});
