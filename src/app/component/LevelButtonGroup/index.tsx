import { useControllableValue } from 'ahooks';
import { LEVEL_NAME } from '../Game/constants';
import { Button, Group } from './styled';
import { LEVEL } from '@/app/lib/constants';

export type LevelButtonGroupProps = {
  value?: LEVEL;
  onChange?: (value: LEVEL) => void;
};

export const LevelButtonGroup: React.FC<LevelButtonGroupProps> = props => {
  const [value, setValue] = useControllableValue<LEVEL>(props);
  return (
    <Group>
      {Object.keys(LEVEL).map(level => {
        const levelNum = parseInt(level, 10) as LEVEL;
        return (
          <Button
            active={value === levelNum}
            key={level}
            onClick={() => {
              setValue(levelNum);
            }}
          >
            {LEVEL_NAME[levelNum]}
          </Button>
        );
      })}
    </Group>
  );
};
