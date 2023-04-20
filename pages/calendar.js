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
    const datesRes = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/get_friends_list', {
      method: "POST",
      body: datesForm
    })
    const data = await datesRes.json();
    
    let dates = []
    for (var i = 0; i < data["friends"].length; ++i) {
      dates.push(JSON.parse(data["friends"][i]))
    }
    
    const bd = new Date();
    const d = new Date();
    d.setFullYear(d.getFullYear(), d.getMonth() + 12);
    let year = d.getFullYear();
    setCurrYear(year)
    const cal = new CalHeatmap();
    cal.paint({ 
      verticalOrientation: true,
      date: { 
        start: bd,
        max: d
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
    <div className="bg-scroll bg-contain fixed overflow-auto h-screen w-full no-scrollbar bg-hero">
      <div className="mx-auto justify-center text-center items-center">
        <div className='w-full fixed bg-white opacity-90 pt-16 top-0 z-20 shadow left-0 top-0 justify-center items-center'>
          <h1 className="font-bold text-3xl pb-2 text-center w-full">{currYear - 1} - {currYear} Calendar</h1>
        </div>
        <div className='flex bg-yellow-400 justify-center fixed mx-auto space-x-[9.20%] w-full z-20 -mt-6'>
          <div>
            Su
          </div>
          <div>
            M
          </div>
          <div>
            T
          </div>
          <div>
            W
          </div>
          <div>
            Th
          </div>
          <div>
            F
          </div>
          <div>
            S
          </div>
        </div>
        <div className="relative w-11/12 text-center items-center flex mt-32 mx-auto">
          <div id="cal-heatmap" className='pb-40 h-full mx-auto justify-center'></div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default Calendar;
