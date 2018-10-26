import React from 'react'
import {View, Text} from 'react-native'
import UneAction from './UneAction'


const ListeActions = ({actions, faireAction}) => {

    return (
        <View>
            { actions.map(action =>
              <UneAction key={action} action={action} faireAction={faireAction}/>
            )} 
        </View>
    )
}

export default ListeActions
