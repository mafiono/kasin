import React from "react";
import img1 from "../assets/img/slider/1.jpg"
import img2 from "../assets/img/slider/2.jpg"
import img3 from "../assets/img/slider/3.jpg"
import img4 from "../assets/img/slider/4.jpg"

const sportsconfig = {
  tab : [
    {
      index : 1,
      title : 'Live Bets',
      EventStatus : "Live"
    },
    {
      index : 2,
      title : 'Prematch Bets',
      EventStatus : "NotStarted"
    },
    {
      index : 4,
      title : 'Next 24hrs',
      EventStatus : "Next24"
    },
    {
      index : 5,
      title : 'Leagues',
      EventStatus : "All"
    },
  ],
  historytab : [
    {
      index : 1,
      title : 'Active Bet',
    },
    {
      index : 2,
      title : 'Settled Bet',
    },
    {
      index : 3,
      title : 'Search Bet Id',
    },
  ],
  weekday : [
    { id : 0 , name : "Sunday"},
    { id : 1 , name : "Monday"},
    { id : 2 , name : "Tuesday"},
    { id : 3 , name : "Wednesday"},
    { id : 4 , name : "Thursday"},
    { id : 5 , name : "Friday"},
    { id : 6 , name : "Saturday"}
  ],
  Lock : 
    <svg width="1.3em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.107 12.536L4 18.256c0 1.166.853 2.12 2.027 2.332 2.56.318 7.253.741 11.946 0C19.147 20.376 20 19.422 20 18.257l-.213-5.721c0-1.166-.96-2.013-2.134-2.225-2.56-.106-7.04-.424-11.413.106-1.173.106-2.027 1.06-2.133 2.119z" stroke="currentColor" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round"></path>
      <path d="M16.267 10.31V7.345C16.267 5.014 14.24 3 11.893 3 9.547 3 7.52 4.907 7.52 7.344v2.967" stroke="currentColor" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round"></path>
      <path d="M12 14v3.137" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
    </svg>,
  matchType : { sports : "sports" , Inplay : "Live" , Upcoming : "NotStarted" ,sportsevent : "sportsevent"},
  sportsUrls : [ "sports" , "Live" , "NotStarted" , "sportsevent" ],
  firstPageImage : [img1 , img2 , img3],
  img4,
  OTHER : "Other",
  ACTIVE : "Active",

  SINGLE : "single",
  MULTI : "multi",

  SUSPENDED : "Suspended",
  DEACTIVATED : "Deactivated",
  FINISHED : "Finished",
  LIVE : "Live",
  NotStarted : "NotStarted",

  T1X2 : "1x2",
  THANDICAP : "handicap",
  TTOTAL : "total",

  ODDSCHANGE : "OddsChange",
  FIXTURECHANGE : "FixtureChange",
  BETSTOP : "BetStop",
  BETSETTLEMENT : "BetSettlement",
  RecoveryEvent : "RecoveryEvent",
}

export default sportsconfig;