import React from 'react';
import { Calendar, Badge } from 'antd';

function getListData(value) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'Test 1' },
          { type: 'success', content: 'Assign. 1' },
          { type: 'error', content: 'This is usual event.' },
        ];
        break;
      default:
    }
    return listData || [];
  }
  
  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }
  
  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }
  
  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

class EventCalendar extends React.Component {
 
    render() {
        return(
            <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
        )
    }
}

export default EventCalendar;