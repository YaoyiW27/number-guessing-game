import { StyleSheet } from 'react-native';

const colors = {
    gradientStart: '#9ED0FF',  
    gradientEnd: '#5D5FEF',   
    textColor: '#4A47A3',  
    buttonText: '#0066CC',     
    buttonReset: '#CC0033',   
  };

const styles = StyleSheet.create({
  header: {
    color: 'blue',
    fontSize: 21,
    fontWeight: 'bold', 
    padding: 5,
    marginBottom: 10,
  },
  welcomeContainer: {
    marginVertical: 10,
  },
  errorText: {
    color: 'gray',
    fontSize: 15,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: 'center', 
    marginTop: 30, 
  },
  formContainer: {
    width: '80%',
    padding: 15,
    borderRadius: 10,     
    backgroundColor: 'lightgray', 
    alignSelf: 'center', 
    marginTop: 40, 
    paddingVertical: 40, 
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  labelColor: { 
    color: 'blue', 
  },
  inputContainer: {
    width: '100%', 
    marginVertical: 10,
  },
  input: {
    width: '100%', 
    borderBottomWidth: 1.5,
    borderBottomColor: 'blue',
    color: 'blue',
    height: 40,
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    color: 'blue',
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  resetButton: {
    color: 'red', 
    fontSize: 16,
  },
  registerButton: {
    color: 'blue', 
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    color: 'blue',
    fontSize: 18,
    marginVertical: 5,
    textAlign: 'left',
  },
  gobackButton: {
    color: 'red',
    fontSize: 16,
  },
  continueButton: {
    color: 'blue',
    fontSize: 16,
  },
  linearGradient: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40, 
  },
  gameContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  restartButton: {
    alignItems: 'flex-end',
    marginBottom: 20,
    marginEnd: -280,
  },
  gameText: {
    color: 'blue',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  grayText: {
    color: 'gray',
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 10,
  },
  resultImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
  },
});
  

export { colors, styles };