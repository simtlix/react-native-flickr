import React from 'react';
import { View, Text } from 'react-native';

const Comment = ({ username, comment }) => {
    const {
        userNameStyle,
        commentStyle
    } = styles;

    return (
        <View>
            <View>
                <Text style={userNameStyle}>{username}</Text>
            </View>
            <View>
                <Text style={commentStyle}>{comment}</Text>
            </View>
        </View>
    );
};

const styles = {
    userNameStyle: {
        fontSize: 12,
        color: '#214c7a',
    },
    commentStyle: {
        fontSize: 14,
        color: '#000000',
    },    
};

export default Comment;