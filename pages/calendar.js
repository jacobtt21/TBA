import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import CalHeatmap from 'cal-heatmap';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import Loading from './loading';

function Calendar() {
  const [user] = useContext(UserContext);
  const [currYear, setCurrYear] = useState()

  const getDateData = async () => {
    const datesForm = new FormData
    datesForm.append("uid", '{"$oid":"'+user.profile.userID+'"}')
    const datesRes = await fetch('http://127.0.0.1:5000/get_friends_list', {
      method: "POST",
      body: datesForm
    })
    const data = await datesRes.json();
    
    let dates = []
    for (var i = 0; i < data["friends"].length; ++i) {
      dates.push(JSON.parse(data["friends"][i]))
    }
    
    const d = new Date();
    let year = d.getFullYear();
    setCurrYear(year)
    const cal = new CalHeatmap();
    cal.paint({ 
      verticalOrientation: true,
      date: { 
        start: new Date(year.toString()+'-01-01'),
        max: new Date(year.toString()+'-12-31')
      },
      domain: {
        type: 'month',
        padding: [0, 0, -35, 0],
        label: { position: 'top', height: 50 },
      },
      scale: {
        color: {
          range: ['#FFFFE0', '#FACC15'],
          interpolate: 'rgb',
          type: 'linear',
          domain: [1, dates.length],
        },
      },
      subDomain: { type: 'xDay', radius: 4, width: 50, height: 50, label: 'D', color: "black" },
      data: { 
        source: dates,
        x: datum => {
          return +new Date(year, datum['month'] - 1, datum['day']);
        },
        y: datum => {
          return +1;
        },
      }, 
    },
    [[
      Tooltip,
      {
        text: function (date, value, dayjsDate) {
          if (value) {
            let bdayNames = ""
            for (var i = 0; i < dates.length; ++i) {
              if (dates[i]["month"] === parseInt(dayjsDate.format('M')) && dates[i]["day"] === parseInt(dayjsDate.format('D'))) {
                bdayNames += dates[i]["fname"] + " " + (dates[i]["lname"]) + "<br />"
              }
            }
            return (
              bdayNames.slice(0, bdayNames.length - 6)
            )
          }
        },
      },
    ]]
    );
  }

  useEffect(() => {
    getDateData()
  }, [])

  return user && currYear ? (
    <div>
      <div className='w-full sticky bg-white opacity-90 pt-16 top-0 z-20 shadow left-0 top-0 justify-center items-center'>
        <h1 className="font-bold text-4xl text-center w-full">
          {currYear} Calendar
        </h1>
        <h2 className="font-bold text-1xl p-2 text-center w-full">
          All your friend's birthdays in 2023
        </h2>
      </div>
      <div id="cal-heatmap" className='flex bg-calbg bg-fixed pb-40 h-full justify-center'></div>
    </div>
  ) : (
    <Loading />
  )
}

export default Calendar;
