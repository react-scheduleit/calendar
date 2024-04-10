import styled from 'styled-components';

interface FlatContainerIterface {
  height?: string;
  width?: string;
  rtl?: boolean;
}

interface RowContainerInterface {
  gap?: string;
}

interface GridItemInterface {
  isHoliday?: boolean;
}

export const FlatContainer = styled.div<FlatContainerIterface>`
  display: flex;
  flex-direction: column;
  height: ${(props) => (props?.height ? props.height : `30rem`)};
  width: ${(props) => (props?.width ? props.width : `30rem`)};
  direction: ${(props) => (props?.rtl ? 'rtl' : `ltr`)};
  gap: 2rem;
`;
export const RowContainerBetween = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 1rem;
`;
export const RowContainer = styled.div<RowContainerInterface>`
  display: flex;
  flex-direction: row;
  gap: ${(props) => (props?.gap ? props.gap : `1rem`)};
`;
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1rem;
`;

export const GridItemContainer = styled.div<GridItemInterface>`
  margin: auto;
  background: ${(props) => (props?.isHoliday ? 'red' : `transparent`)};
`;
