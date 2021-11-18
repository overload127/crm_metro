export const wrapTechCards = (rawData) => {
  if (rawData.length === 0)
    return [];

  const outData = rawData.map((item) => {
    const devicesForWork = item.devices_for_work.map((device) => device.short_name);

    return {
      id: item.id,
      code: item.code,
      name: item.name,
      description: item.description,
      du46: item.du46,
      order: item.order,
      pafu: item.pafu,
      jtp: item.jtp,
      devicesForWork,
    };
  });

  return outData;
};

export const convertUsers = (rawData) => {
  if (rawData.length === 0)
    return [];

  const outData = rawData.map((item) => ({
    id: item.user__id,
    firstName: item.user__first_name,
    profileId: item.id,
    okolotokId: item.okolotok__id,
    okolotokName: item.okolotok__name,
  }));

  return outData;
};

export const convertStations = (rawData) => {
  if (rawData.length === 0)
    return [];

  const outData = rawData.map((item) => ({
    id: item.id,
    name: item.name,
    shortName: item.short_name,
  }));

  return outData;
};

export const convertDeviceForWork = (rawData) => {
  if (rawData.length === 0)
    return [];

  const outData = rawData.map((item) => ({
    id: item.id,
    name: item.name,
    shortName: item.short_name,
    description: item.description,
  }));

  return outData;
};