import { isEmpty, getPropByPath } from './common';

/**
 * Функции для работы с массивами
 * @module Массивы
 */

/**
 * Проверит содержится ли элемент в массиве
 *
 * @param {mixed} value
 * @param {array} array
 * @param {Boolean} strict - если true - проверка будет проведена в строгом режиме
 * @returns {Boolean}
 */
const inArray = (value, array, strict = false) => {
    if (!isEmpty(strict)) {
        if (typeof strict === 'boolean') {
            if(strict) return (!(array.indexOf(value) === -1));
        } else {
            throw new Error('3rd param must be boolean');
        }
    }
    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) return true;
    }

    return false;
}


/**
 * Проверит содержится ли хотя бы один элемент из первого массива
 * во втором
 *
 * @param {array} needles массив значений, которые ищем
 * @param {array} array   массив, в котором ищем
 * @returns {Boolean}
 */
const isAnyInArray = (needles, array) => {
    var result = false;
    for (var i = 0; i < needles.length; i++) {

        if (inArray(needles[i], array, true)) {
            result = true;
            break;
        }
    }
    return result;
}

/**
 * Удалит из массива все эелменты в строгом смысле совпадающие с
 * value
 *
 * @param {array} arr
 * @param {mixed} value элемент, равные которому надо удалить из массива
 * @return {Array|JSWrapperLib.removeAllElementsLike.newArr}
 */
const removeAllElementsLike = (arr, value) => {
    var newArr = [];
    arr.forEach((currentElement, index, array) => {
        if (currentElement !== value) {
            newArr.push(currentElement);
        }
    });

    return newArr;
}

/**
 * Вернет массив, оставив там только уникальные значения
 * ( JavaScript 1.6 / ECMAScript 5)
 * @link https://stackoverflow.com/a/14438954
 *
 * @param {array} arr исходный массив
 * @return {array}
 */
const uniqueArray = (arr) => {
    return Array.from(new Set(arr));
}

/**
 * Проверит, что все элементы массива не пусты (в смысле вызова для каждого jswl.isEmpty())
 *
 * @param {array} value
 * @returns {boolean}
 */
const allNotEmpty = (arr) => {
    var result = true;
    for (var i = 0; i < arr.length; i++) {
        if (isEmpty(arr[i])) {
            result = false;
            break;
        }
    }

    return result;
}


/**
 * Вернет объект вида:
 * { key: key, value: value}, где value - первый элемент из массива объектов arr,
 * если указанное свойство этого объекта propName совпадает с указанным значением propValue
 *
 * @param {array} arr        массив объектов
 * @param {string} propName  имя-путь поля по которому ищем  например 'properties.id' (в качестве разделителей поддерживает точки)
 * @param {mixed} propValue  значение поля, которое ищем
 * @returns {object}  в случае неудачного поиска {value: undefiend, key: undefiend}
 */
const getArrElementAndIndexByObjectProp = (arr, propName, propValue) => {

    var result = {
        key: i,
        value: arr[i]
    };
    var foundValue = null;
    for (var i = 0; i < arr.length; i++) {
        foundValue = getPropByPath(arr[i], propName);
        if (foundValue.found &&
            (foundValue.value === propValue)) {
            result = {
                key: i,
                value: arr[i]
            };
            break;
        }
    }

    return result;
}

/**
 * Вернет первый элемент из массива объектов, если указанное свойство этого объекта совпадает с указанным значением
 *
 * @param {array} arr        массив объектов
 * @param {string} propName  имя-путь поля по которому ищем  например 'properties.id' (в качестве разделителей поддерживает точки)
 * @param {mixed} propValue  значение поля, которое ищем
 * @returns {mixed}
 */
const getArrElementByObjectProp = (arr, propName, propValue) => {

    var result = getArrElementAndIndexByObjectProp(arr, propName, propValue);
    return result ? result.value : result;
}


const array = {
    inArray,
    isAnyInArray,
    removeAllElementsLike,
    uniqueArray,
    allNotEmpty,
    getArrElementAndIndexByObjectProp,
    getArrElementByObjectProp
};




export { array };