import * as Linking from 'expo-linking';
import { Button, IButtonProps } from 'native-base';
import { useCallback } from 'react';

interface LinkButtonProps extends IButtonProps {
  href: string;
}

const LinkButton = ({ href, ...props }: LinkButtonProps) => {
  const handlePress = useCallback(() => {
    Linking.openURL(href);
  }, [href]);

  return <Button onPress={handlePress} {...props} />;
};

export { LinkButton };
