import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class App extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      display: '',
      result: ''
    }
  }
  handleOp(op){
    if (op==='Clear') {
      this.setState({
        display: '',
        result: ''
      })
    }else if (op==='=') {
      this.setState({
        display: this.state.result,
        result: ''
      })
    }else{
      const display = this.state.display + op
      let result = this.state.result
      try{
        let fixedOperation = display.split('x').join('*')
        fixedOperation = fixedOperation.split('÷').join('/')
        fixedOperation = fixedOperation.split(',').join('.')
        result = new String(eval(fixedOperation)).toString()
      }catch(e){

      }  
      this.setState({
        display,
        result
      })
    }
   
  }
  
  render() {
    
    const col1Buttons = [
      ['Clear'],
      ['7', '8', '9'],
      ['4', '5', '6'],
      ['1', '2', '3'],
      [',', '0', '=']
    ]
    const col2Buttons = ['÷', 'x', '-', '+',]
  return (
    <LinearGradient colors={['#FFF','#E6FFF7','#E6FFF7']} style={{ flex: 1 }}>
        
    <View style={styles.container}>
      <Text style={styles.display}>{this.state.display}</Text>
      <Text style={styles.result}>{this.state.result}</Text>
      <View style={styles.buttons}>
        <View style={styles.col1}>
          { col1Buttons.map( (line,ind) => <View key={ind} style={styles.line}>
           { line.map( op => <TouchableOpacity key={op} style={styles.btn} onPress={() => this.handleOp(op)}>
                <Text style={styles.btnText}>
                  {op}
                </Text> 
              </TouchableOpacity>  )}
              
          </View>
          )}
          
        </View>
        <View style={styles.col2}>
        { col2Buttons.map( op => <TouchableOpacity key={op} style={styles.btn} onPress={() => this.handleOp(op)}>
                <Text style={styles.btnText2}>
                  {op}
                </Text> 
              </TouchableOpacity> )}
        </View>
      </View>
    </View>
    </LinearGradient>
  );
}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  display:{
    flex: 1,
    fontSize: 70,
    textAlign: 'right',
    paddingTop: 30,
    paddingRight: 10
  },
  result:{
    flex: 0.4,
    fontSize: 35,
    textAlign: 'right',
    paddingRight: 10,
    paddingBottom: 10
  },
  buttons:{
    flex: 5,
    flexDirection: 'row'
  },
  col1:{
    flex: 3,
  },
  line:{
    flex: 1,
    flexDirection: 'row',
  },
  btn:{
    flex: 1,
    justifyContent: 'center',
    borderRadius: 3,
    borderWidth: 0.1,
    margin: 4
  },
  btnText:{
    textAlign: 'center',
    fontSize: 35,
    color: '#737373'
  },
  btnText2:{
    textAlign: 'center',
    fontSize: 35,
    color: '#00004d'
  },
  col2:{
    flex: 1,
  }
  
});

