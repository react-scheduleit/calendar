import { CSSProperties, FC, useEffect, useState } from 'react';
import {
  GridContainer,
  FlatContainer,
  RowContainer,
  RowContainerBetween,
  GridItemContainer,
} from './style';

import moment from 'moment';
import NextIcon from '@calendar/assets/icons/Next';
import PrevIcon from '@calendar/assets/icons/Prev';

import {
  gregorianDays,
  gregorianMonth,
  jalaliDays,
} from '../../constants/string';

interface FlatCalender {
  width?: string;
  height?: string;
  iconsStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  calenderType?: 'JALALI' | 'GREGORIAN';
  nextMonthIcon?: JSX.Element | string | number;
  prevMonthIcon?: JSX.Element | string | number;
  todayBackground?: string;
  showDisableDays?: boolean;
}
const FlatCalendar: FC<FlatCalender> = ({
  height,
  width,
  iconsStyle,
  titleStyle,
  containerStyle,
  calenderType = 'GREGORIAN',
  nextMonthIcon = <NextIcon />,
  prevMonthIcon = <PrevIcon />,
  todayBackground = '#e2e2e2',
  showDisableDays = false,
}) => {
  const rtlCondition = calenderType === 'JALALI';
  const todayNumber = moment().date();
  const [monthNumber, setMonthNumber] = useState<number>(moment().month() || 1);
  const [yearsNumber, setYearsNumber] = useState<number>(moment().year() || 0);
  const [lastMonth, setLastMonth] = useState<string>('');
  const [nextMonth, setNextMonth] = useState<string>('');
  const [lastMonthDisabledDays, setLastMonthDisabledDays] = useState<number[]>(
    []
  );
  const [nextMonthDisabledDays, setNextMonthDisabledDays] = useState<number[]>(
    []
  );

  const [showDay, setShowDay] = useState<number[]>([]);

  useEffect(() => {
    const year = moment().year();
    const month = moment().month();

    setMonthNumber(month);
    setYearsNumber(year);
  }, []);

  useEffect(() => {
    const days = moment(`${yearsNumber}-${monthNumber + 1}-01`).day();
    const currentDaysInMonth = moment(
      `${yearsNumber}-${monthNumber + 1}`,
      'YYYY-MM'
    ).daysInMonth();

    const mainShowDay = Array.from(
      {
        length: currentDaysInMonth,
      },
      (_, i) => i + 1
    );
    // if showDisabledDays is true , show last month and next month days
    if (showDisableDays) {
      const lastMonth = moment(
        `${yearsNumber}-${monthNumber + 1}-${todayNumber}`
      )
        .subtract(1, 'months')
        .format('YYYY-MM-DD');
      const endOfMonth = moment(`${yearsNumber}-${monthNumber + 1}`, 'YYYY-MM')
        .endOf('month')
        .day();

      const lastMonthDisabledDays = Array.from(
        {
          length: moment(lastMonth, 'YYYY-MM').daysInMonth(),
        },
        (_, i) => i + 1
      )
        .reverse()
        .slice(0, days ? days - 1 : 6)
        .reverse();

      const nextMonthDisabledDays = Array.from(
        { length: endOfMonth ? 7 - endOfMonth : 0 },
        (_, i) => i + 1
      );
      setLastMonth(lastMonth);
      // setNextMonth(endOfMonth);

      setLastMonthDisabledDays(lastMonthDisabledDays);
      setNextMonthDisabledDays(nextMonthDisabledDays);
      setShowDay(mainShowDay);
    } else {
      // else show normal days of month
      const beforShowDays = Array.from(
        { length: days ? days - 1 : 6 },
        (_, i) => 0
      );
      setShowDay([...beforShowDays, ...mainShowDay]);
    }
  }, [yearsNumber, monthNumber, showDisableDays]);

  const handleNxtMonth = () => {
    setMonthNumber((monthNumber) => (monthNumber === 11 ? 0 : monthNumber + 1));
    if (monthNumber === 11) {
      setYearsNumber((monthNumber) => monthNumber + 1);
    }
  };

  const handlePrvMonth = () => {
    setMonthNumber((monthNumber) => (monthNumber === 0 ? 11 : monthNumber - 1));
    if (monthNumber === 0) {
      setYearsNumber((monthNumber) => monthNumber - 1);
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
          <span>{gregorianMonth[monthNumber]}</span>
          <span>{yearsNumber}</span>
        </RowContainer>
        {
          <RowContainer gap="2rem" style={titleStyle || {}}>
            <span onClick={handlePrvMonth}>{prevMonthIcon}</span>
            <span onClick={handleNxtMonth}>{nextMonthIcon}</span>
          </RowContainer>
        }
      </RowContainerBetween>
      <GridContainer>
        {(calenderType === 'JALALI' ? jalaliDays : gregorianDays).map(
          (item, i) => (
            <GridItemContainer key={i}>{item}</GridItemContainer>
          )
        )}
      </GridContainer>
      <GridContainer>
        {showDisableDays &&
          lastMonthDisabledDays.map((item, i) => (
            <GridItemContainer
              isWeekend={
                !!item &&
                (moment(`${lastMonth}`).day() === 0 ||
                  moment(`${lastMonth}`).day() === 6)
              }
              isDisableDay={showDisableDays}
              key={i}
            >
              {item}
            </GridItemContainer>
          ))}
        {showDay.map((item, i) => (
          <GridItemContainer
            isWeekend={
              !!item &&
              (moment(`${yearsNumber}-${monthNumber + 1}-${item}`).day() ===
                0 ||
                moment(`${yearsNumber}-${monthNumber + 1}-${item}`).day() === 6)
            }
            isToday={todayNumber === item}
            todayBackground={todayBackground}
            key={i}
          >
            {!!item && item}
          </GridItemContainer>
        ))}
        {showDisableDays &&
          nextMonthDisabledDays.map((item, i) => (
            <GridItemContainer
              isDisableDay={showDisableDays}
              isWeekend={
                !!item &&
                (moment(`${nextMonth}-${item}`).day() === 0 ||
                  moment(`${nextMonth}-${item}`).day() === 6)
              }
              key={i}
            >
              {item}
            </GridItemContainer>
          ))}
      </GridContainer>
    </FlatContainer>
  );
};
export default FlatCalendar;
