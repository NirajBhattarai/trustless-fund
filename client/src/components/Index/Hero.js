import React, {Component} from 'react';
import Button from '../Shared/Button';

import '../../layout/components/hero.sass';

class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFunds: [],
      render: false
    }

    if(window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        this.props.drizzle.store.dispatch({type: 'ACCOUNTS_FETCHED', accounts});
        this.isUserFunds();
      });
    }

    if(this.props.drizzle.web3.givenProvider) {
      this.isUserFunds();
    } else {
      this.state = {render: true}
    }
  }

  isUserFunds = async () => {
    const v1UserFunds = await this.props.drizzle.contracts.TrustlessFundFactory.methods.getUserFunds(
      this.props.drizzleState.accounts[0]
    ).call();
    const v2UserFunds = await this.props.drizzle.contracts.TrustlessFundFactoryV2.methods.getUserFunds(
      this.props.drizzleState.accounts[0]
    ).call();

    const userFunds = v1UserFunds.concat(v2UserFunds);

    this.setState({userFunds});

    if(userFunds.length === 0) {
      this.setState({render: true});
    } else {
      this.setState({render: false});
    }
  }

  render() {
    if(this.state.render) {
      return (
        <section className="hero">
          <h1 className="hero__header">
            Deploy a Trustless Fund
          </h1>
          <h4 className="hero__subheader">
            Lock in the Time-Value of Your Money
          </h4>
          <div className="hero__buttons">
            <Button 
              text="Create Fund" 
              class="solid hero__button" 
              link="/factory" 
              button={false} />
            <a 
              href="https://docs.trustless.fund/" 
              className="hero__learn-more"
              target="_blank"
              rel="noopener noreferrer">
              Learn More
            </a>
          </div>
        </section>
      );
    }
    return null;
  }
}

export default Hero;