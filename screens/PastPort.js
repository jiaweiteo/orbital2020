import * as React from 'react';
import { Text } from 'react-native'

class PastPort extends React.Component {
    static navigationOptions = {
        title: 'Past Portfolio',
    };
    render() {
        return (
            <Text>View your past few months of expenses</Text>
        );
    }
}

export default PastPort