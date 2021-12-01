import moment from 'moment';


const wrapTPWork = (rawData) => {
  if (rawData.length === 0)
    return [];

  const outData = [];
  rawData.forEach((item) => {
    const dateStart = moment(new Date(item.date_start));
    const dateEnd = moment(new Date(item.date_end));
    const diff = moment.duration(dateEnd.diff(dateStart));
    const duration = diff.asMinutes();

    const techCards = [];
    const preDevices = [];
    item.tech_cards.forEach((techCard) => {
      techCards.push({
        code: techCard.code,
        du46: techCard.du46,
      });
      techCard.devices_for_work.forEach((device) => preDevices.push(device.name));
    });
    const devices = new Set(preDevices);

    const users = item.users.map((user) => ({
      id: user.id,
      firstName: user.first_name
    }));

    outData.push({
      id: item.id,
      datetimeStart: dateStart,
      datetimeEnd: dateEnd,
      duration: Math.round(duration),
      note: item.note,
      subdivision: item.subdivision,
      okolotokName: item.okolotok.name,
      stationName: item.station.name,
      stationShortName: item.station.short_name,
      techCards,
      devices,
      users,
      isDeleting: false,
    });
  });

  return outData;
};


// const wrapTPWork = (rawData) => {
//   if (rawData.length === 0)
//     return [];

//   const preData = {};
//   rawData.forEach((lineItem) => {
//     if (!(lineItem.id in preData)) {
//       const dataStart = moment(new Date(lineItem.data_start));
//       const dataEnd = moment(new Date(lineItem.data_end));
//       const diff = moment.duration(dataEnd.diff(dataStart));
//       const duration = diff.asMinutes();

//       preData[lineItem.id] = {
//         id: lineItem.id,
//         datetimeStart: dataStart,
//         datetimeEnd: dataEnd,
//         duration: Math.round(duration),
//         note: lineItem.note,
//         subdivision: lineItem.subdivision,
//         stationName: lineItem.station__name,
//         stationShortName: lineItem.station__short_name,
//         techCardsCode: '',
//       };
//     }

//     preData[lineItem.id].techCardsCode += ` ${lineItem.type_work__code}`;
//     preData[lineItem.id].techCardsCode = preData[lineItem.id].techCardsCode.trim();
//   });

//   return Object.values(preData);
// };

export default wrapTPWork;