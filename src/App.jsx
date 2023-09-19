import React, { Component } from 'react';

class CalendarGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      calendar: []
    };
  }

  generateCalendar = () => {
    const { year, month } = this.state;
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();

    const calendar = [];
    let dayCounter = 1;
    let currentWeek = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      currentWeek.push('');
    }

    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);

      if (currentWeek.length === 7) {
        calendar.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      calendar.push(currentWeek);
    }

    this.setState({ calendar });
  };

  handleMonthChange = (e) => {
    this.setState({ month: parseInt(e.target.value, 10) }, this.generateCalendar);
  };

  handleYearChange = (e) => {
    this.setState({ year: parseInt(e.target.value, 10) }, this.generateCalendar);
  };

  componentDidMount() {
    this.generateCalendar();
  }

  render() {
    const { year, month, calendar } = this.state;

    return (
      <div>
        <label>
          Месяц:
          <input type="number" value={month} onChange={this.handleMonthChange} />
        </label>
        <label>
          Год:
          <input type="number" value={year} onChange={this.handleYearChange} />
        </label>

        <table>
          <thead>
            <tr>
              <th>Пн</th>
              <th>Вт</th>
              <th>Ср</th>
              <th>Чт</th>
              <th>Пт</th>
              <th>Сб</th>
              <th>Вс</th>
            </tr>
          </thead>
          <tbody>
            {calendar.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => (
                  <td key={dayIndex}>{day}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CalendarGenerator;