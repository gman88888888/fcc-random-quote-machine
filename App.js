import React, {Component} from 'react';
import { random } from 'lodash';
import 'typeface-roboto';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import QuoteMachine from './components/QuoteMachine';

const styles = {
  container:{
    alignItems: 'center',
    display: 'flex',
    height: '100vh',
  }
};

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      quotes: [],
      selectedQuoteIndex: null,
    }
    this.selectQuoteIndex = this.generatgeQuoteIndex.bind(this);
    this.assignNewQuoteIndex = this.assignNewQuoteIndex.bind(this);
  }

  componentDidMount(){
    fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
      .then(data => data.json())
      .then(quotes => this.setState({quotes}, this.assignNewQuoteIndex));
  }

  get selectedQuote() {
    if (!this.state.quotes.length || !Number.isInteger(this.state.selectedQuoteIndex)){
      return undefined;
    }
    return this.state.quotes[this.state.selectedQuoteIndex]; 
  }

  /**
   * Returns an integer representingan indexin state.quotes 
   * If state.quotes is empty, return undefined
   */
  generatgeQuoteIndex(){
    if (!this.state.quotes.length){
      return undefined;
    }
      return random(0, this.state.quotes.length - 1);
  }

  assignNewQuoteIndex (){
    this.setState({selectedQuoteIndex: this.generatgeQuoteIndex()});
  }

  render(){
    return (
      <Grid className={this.props.classes.container} id="quote-box" justify="center" container>
        <Grid xs={11} lg={8} item>
          {
            this.selectedQuote ?
              <QuoteMachine selectedQuote={this.selectedQuote} assignNewQuoteIndex={this.assignNewQuoteIndex}/>
              :null
          }
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
