import { CSSProperties, FC, useEffect, useState } from 'react';
import {
  GridContainer,
  FlatContainer,
  RowContainer,
  RowContainerBetween,
  GridItemContainer,
} from './style';
import {
  gregorianDays,
  gregorianMonth,
  jalaliDays,
} from '../../constants/string';
import moment from 'moment';
interface FlatCalender {
  width?: string;
  height?: string;
  iconsStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  calenderType?: 'JALALI' | 'GREGORIAN';
}
const FlatCalendar: FC<FlatCalender> = ({
  height,
  width,
  iconsStyle,
  titleStyle,
  containerStyle,
  calenderType = 'GREGORIAN',
}) => {
  const rtlCondition = calenderType === 'JALALI';
  const [MonthNumber, setMonthNumber] = useState<number>(0);
  const [yearsNumber, setYearsNumber] = useState<number>(0);
  const [showDay, setShowDay] = useState<string[]>([]);

  useEffect(() => {
    const year = moment().year();
    const month = moment().month();

    setMonthNumber(month);
    setYearsNumber(year);
  }, []);

  useEffect(() => {
    const Days = moment(`${yearsNumber}-${MonthNumber + 1}-01`).day();
    const beforShowDay = Array.from(
      { length: Days ? Days - 1 : 6 },
      (_, i) => ''
    );
    const mainShowDay = Array.from(
      { length: moment(`${yearsNumber}-${MonthNumber + 1}`).daysInMonth() },
      (_, i) => `${i + 1}`
    );
    setShowDay([...beforShowDay, ...mainShowDay]);
  }, [yearsNumber, MonthNumber]);

  const handleNxtMonth = () => {
    setMonthNumber((MonthNumber) => (MonthNumber === 11 ? 0 : MonthNumber + 1));
    if (MonthNumber === 11) {
      setYearsNumber((MonthNumber) => MonthNumber + 1);
    }
  };

  const handlePrvMonth = () => {
    setMonthNumber((MonthNumber) => (MonthNumber === 0 ? 11 : MonthNumber - 1));
    if (MonthNumber === 0) {
      setYearsNumber((MonthNumber) => MonthNumber - 1);
    }
  };

  return (
    <FlatContainer
      height={height}
      width={width}
      rtl={rtlCondition}
      style={containerStyle || {}}
    >
      <RowContainerBetween>
        <RowContainer style={iconsStyle || {}}>
          <span>{gregorianMonth[MonthNumber]}</span>
          <span>{yearsNumber}</span>
        </RowContainer>
        {
          <RowContainer gap="2rem" style={titleStyle || {}}>
            <span onClick={handlePrvMonth}>{'<'}</span>
            <span onClick={handleNxtMonth}>{'>'}</span>
          </RowContainer>
        }
      </RowContainerBetween>
      <GridContainer>
        {(calenderType === 'JALALI' ? jalaliDays : gregorianDays).map(
          (item) => (
            <GridItemContainer>{item}</GridItemContainer>
          )
        )}
      </GridContainer>
      <GridContainer>
        {showDay.map((item) => (
          <GridItemContainer
            isHoliday={
              !!item &&
              (moment(`${yearsNumber}-${MonthNumber + 1}-${item}`).day() ===
                0 ||
                moment(`${yearsNumber}-${MonthNumber + 1}-${item}`).day() === 6)
            }
          >
            {item}
          </GridItemContainer>
        ))}
      </GridContainer>
    </FlatContainer>
  );
};
export default FlatCalendar;
