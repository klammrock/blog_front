import _ from 'lodash';
/**
 * Simple compose method
 * @param {*} methods
 */
export function compose(...methods) {
  return methods.reduce((acc, method) => (arg) => method(acc(arg)), (arg) => arg);
}

export function buildQuery(data) {
  if (typeof (data) === 'string') {
    return data;
  }

  const query = [];

  Object.keys(data)
    .filter((key) => data[key] !== undefined)
    .forEach((key) => {
      query.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
    });

  return query.join('&');
}

/**
 * Simple debounce method. May be better to use lodash!?
 * @param {number} time
 * @param {function} callback
 * @param {boolean} waitCalm
 */
export function debounce(time, callback, waitCalm) {
  let timerId = null;

  const runIt = (args) => setTimeout(() => {
    timerId = null;
    callback(...args);
  }, time);

  return (...args) => {
    if (timerId) {
      if (waitCalm) {
        clearTimeout(timerId);
        timerId = runIt(args);
      }
      return;
    }
    timerId = runIt(args);
  };
}


/**
 * Simple throttle method. May be better to use lodash!?
 * @param {number} time
 * @param {function} callback
 * @param {boolean} waitCalm
 */
export function throttle(time, callback, waitCalm) {
  let timerId = null;

  const runIt = () => setTimeout(() => {
    timerId = null;
  }, time);

  return (...args) => {
    if (timerId) {
      if (waitCalm) {
        clearTimeout(timerId);
        timerId = runIt();
      }
      return;
    }
    callback(...args);
    timerId = runIt();
  };
}

export function isDigit(value) {
  return value === '-' || !Number.isNaN(+value.trim());
}

/**
 * Рекурсивная функция поиска по массиву объектов
 * Возвращает найденный item
 *
 * @param array = [ { key: value, children: [] } ]
 * @param key
 * @param value
 * @param children
 * @param result
 * @returns {*}
 */
export function depthArraySearch(array, key, value, children, result) {
  let newResult = result;
  _.some(array, (item) => {
    if (item[key] === value) {
      newResult = item;
      return true;
    }
    if (!_.isEmpty(item[children])) {
      newResult = depthArraySearch(item.zones, key, value, children, newResult);
    }
    return false;
  });
  return newResult;
}

/**
 * Рекурсивная функция поиска по массиву объектов
 * Добавляет newItem в найденный item
 *
 * @param array = [ { key: value, children: [] } ]
 * @param key
 * @param value
 * @param newItem
 * @param children
 * @returns {*}
 */
export function addItemByDepthArraySearch(array, key, value, newItem, children) {
  if (!value) {
    const newArray = _.clone(array);
    newArray.push(newItem);
    return newArray;
  }

  return _.map(array, (item) => {
    if (item[key] === value) {
      const newChildren = _.concat(item[children], [newItem]);
      return _.set(_.clone(item), children, newChildren);
    }

    return !_.isEmpty(item[children])
      ? _.set(
        _.clone(item),
        children,
        addItemByDepthArraySearch(item.zones, key, value, newItem, children)
      )
      : item;
  });
}

/**
 * Рекурсивная функция поиска по массиву объектов
 * Переписывает найденный item, присваивая ему значение newItem
 *
 * @param array = [ { key: value, children: [] } ]
 * @param key
 * @param value
 * @param newItem
 * @param children
 * @returns {*}
 */
export function editItemByDepthArraySearch(array, key, value, newItem, children) {
  return _.map(array, (item) => {
    if (item[key] === value) {
      return newItem;
    }

    return !_.isEmpty(item.zones)
      ? _.set(
        _.clone(item),
        children,
        editItemByDepthArraySearch(item.zones, key, value, newItem, children)
      )
      : item;
  });
}

/**
 * Рекурсивная функция поиска устройства в зонах объекта
 * Переписывает переданный атрибут key устройства с id=deviceId
 *
 * @param zones = [ { key: value, children: [] } ]
 * @param key
 * @param value
 * @param deviceId
 * @returns {*}
 */
export function editDeviceByDepthArraySearch(zones, deviceId, key, value) {
  return _.map(zones, (zone) => {
    const newDevices = _.map(zone.devices, (device) => {
      if (device.id === deviceId) {
        return { ...device, [key]: value };
      }
      return device;
    });

    if (!_.isEmpty(zone.zones)) {
      _.set(zone, 'zones', editDeviceByDepthArraySearch(zone.zones, deviceId, key, value));
    }

    return { ...zone, devices: newDevices };
  });
}
