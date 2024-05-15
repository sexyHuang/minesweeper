import { useControllableValue } from 'ahooks';
import { LEVEL, LEVEL_NAME } from '../Game/constants';
import { Button, Group } from './styled';

export type LevelButtonGroupProps = {
  value?: keyof typeof LEVEL;
  onChange?: (value: keyof typeof LEVEL) => void;
};

export const LevelButtonGroup: React.FC<LevelButtonGroupProps> = props => {
  const [value, setValue] = useControllableValue<keyof typeof LEVEL>(props);
  return (
    <Group>
      {Object.keys(LEVEL).map(level => {
        return (
          <Button
            active={value === level}
            key={level}
            onClick={() => {
              setValue(level as keyof typeof LEVEL);
            }}
          >
            {LEVEL_NAME[level as keyof typeof LEVEL]}
          </Button>
        );
      })}
    </Group>
  );
};
