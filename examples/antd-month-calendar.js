/* eslint react/no-multi-comp:0, no-console:0 */

import 'rc-calendar/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import MonthCalendar from 'rc-calendar/src/MonthCalendar';
import DatePicker from 'rc-calendar/src/Picker';
import zhCn from 'gregorian-calendar/lib/locale/zh_CN'; // spm error
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import CalendarLocale from 'rc-calendar/src/locale/zh_CN';
const now = new GregorianCalendar(zhCn);
now.setTime(Date.now());
const formatter = new DateTimeFormat('yyyy-MM');

const defaultCalendarValue = new GregorianCalendar(zhCn);
defaultCalendarValue.setTime(Date.now());
defaultCalendarValue.addMonth(-1);

const Test = React.createClass({
  propTypes: {
    defaultValue: React.PropTypes.object,
  },
  getInitialState() {
    return {
      showTime: true,
      disabled: false,
      value: this.props.defaultValue,
    };
  },

  onChange(value) {
    console.log(`DatePicker change: ${value && formatter.format(value)}`);
    this.setState({
      value,
    });
  },

  onShowTimeChange(e) {
    this.setState({
      showTime: e.target.checked,
    });
  },

  toggleDisabled() {
    this.setState({
      disabled: !this.state.disabled,
    });
  },

  render() {
    const state = this.state;
    const calendar = (<MonthCalendar
      locale={CalendarLocale}
      style={{ zIndex: 1000 }}
    />);
    return (<div style={{ width: 240, margin: 20 }}>
      <div style={{ marginBottom: 10 }}>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label>
          <input
            checked={state.disabled}
            onChange={this.toggleDisabled}
            type="checkbox"
          /> disabled
        </label>
      </div>
      <div style={{
        boxSizing: 'border-box',
        position: 'relative',
        display: 'block',
        lineHeight: 1.5,
        marginBottom: 22,
      }}
      >
        <DatePicker
          animation="slide-up"
          disabled={state.disabled}
          calendar={calendar}
          value={state.value} onChange={this.onChange}
        >
          {
            ({ value }) => {
              return (<input
                style={{ width: 200 }}
                readOnly
                disabled={state.disabled}
                value={value && formatter.format(value)}
                placeholder="请选择日期"
              />);
            }
          }

        </DatePicker>
      </div>
    </div>);
  },
});

function onStandaloneSelect(value) {
  console.log('month-calendar select', (value && formatter.format(value)));
}

function onStandaloneChange(value) {
  console.log('month-calendar change', (value && formatter.format(value)));
}

function disabledDate(value) {
  return value.getYear() > now.getYear() ||
    value.getYear() === now.getYear() && value.getMonth() > now.getMonth();
}

ReactDOM.render(
  (<div
    style={{
      zIndex: 1000,
      position: 'relative',
      width: 600,
      margin: '0 auto',
    }}
  >
    <h2>zh-cn</h2>
    <MonthCalendar
      locale={CalendarLocale}
      style={{ zIndex: 1000 }}
      disabledDate={disabledDate}
      onSelect={onStandaloneSelect}
      onChange={onStandaloneChange}
      defaultValue={defaultCalendarValue}
    />

    <div style={{ marginTop: 200 }}>
      <Test defaultValue={now}/>
    </div>
  </div>)
  , document.getElementById('__react-content'));
