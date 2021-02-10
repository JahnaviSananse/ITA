import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from "./style"
import * as utility from '../../../Utility/util'
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux';
import { AIMS, DIRECTIONS, MOVEMENT_TYPES, STATIC_TYPES, SimpleAnimation } from 'react-native-simple-animations';

class WalkThrough extends React.Component {
    componentDidMount() {
        utility.recordScreen("getting started view")
    }


    render() {


        const { url, title, detail, more } = this.props;
        return (
            <View style={{ justifyContent: "flex-start", alignItems: "center", marginBottom:150 }}>

    <SimpleAnimation
          aim={AIMS.IN}
          animateOnUpdate={true}
          delay={500}
          fade
          direction={null}
          distance={500}
          duration={1000}
          movementType={MOVEMENT_TYPES.SLIDE}
          staticType={'zoom'}
        >
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <FastImage style={styles.iconStyle} resizeMode={FastImage.resizeMode.contain} source={url} />
                
                <Text style=
                {[
                    styles.headingText,
                    {color: utility.changeFontColor("#233746"),}
                ]}
                >{title}
                </Text>
                </View>
                </SimpleAnimation>
                
                <SimpleAnimation
          aim={AIMS.IN}
          animateOnUpdate={true}
          delay={1000}
          direction={DIRECTIONS.UP}
          distance={500}
          duration={1000}
          movementType={MOVEMENT_TYPES.SLIDE}
          staticType={'zoom'}

        >
 <Text style=
                {[
                    styles.descText1,
                    {color: utility.changeFontColor("#233746"),}
                ]}
                >{detail}</Text></SimpleAnimation>

<SimpleAnimation
          aim={AIMS.IN}
          animateOnUpdate={true}
          delay={1500}
          direction={DIRECTIONS.UP}
          distance={500}
          duration={1000}
          movementType={MOVEMENT_TYPES.SLIDE}
          staticType={'zoom'}

        >
                <Text style=
                {[
                    styles.descText2,
                    {color: utility.changeFontColor("#233746"),}
                ]}
                >{more}</Text>
                </SimpleAnimation>
            </View>
        );
    }

}

const mapStateToProps = state => {
    const { userData } = state.user
    return {
      userData,
    }
  };
  
  export default connect(mapStateToProps, null)(WalkThrough)