import { StackNavigator } from 'react-navigation';

import Photos from '@containers/Photos';

const RootNavigator = StackNavigator(
	{
		Gallery: {
			screen: Photos,
		},
	},
	{
		initialRouteName: 'Photos',
	}
);

export default RootNavigator;
