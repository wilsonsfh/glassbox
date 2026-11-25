(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
    get: (a2, b2) => (typeof require !== "undefined" ? require : a2)[b2]
  }) : x2)(function(x2) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x2 + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/nanoassert/index.js
  var require_nanoassert = __commonJS({
    "node_modules/nanoassert/index.js"(exports, module) {
      module.exports = assert;
      var AssertionError = class extends Error {
      };
      AssertionError.prototype.name = "AssertionError";
      function assert(t2, m2) {
        if (!t2) {
          var err = new AssertionError(m2);
          if (Error.captureStackTrace) Error.captureStackTrace(err, assert);
          throw err;
        }
      }
    }
  });

  // node_modules/b4a/lib/ascii.js
  var require_ascii = __commonJS({
    "node_modules/b4a/lib/ascii.js"(exports, module) {
      function byteLength(string) {
        return string.length;
      }
      function toString(buffer) {
        const len = buffer.byteLength;
        let result = "";
        for (let i2 = 0; i2 < len; i2++) {
          result += String.fromCharCode(buffer[i2] & 127);
        }
        return result;
      }
      function write(buffer, string) {
        const len = buffer.byteLength;
        for (let i2 = 0; i2 < len; i2++) {
          buffer[i2] = string.charCodeAt(i2);
        }
        return len;
      }
      module.exports = {
        byteLength,
        toString,
        write
      };
    }
  });

  // node_modules/b4a/lib/base64.js
  var require_base64 = __commonJS({
    "node_modules/b4a/lib/base64.js"(exports, module) {
      var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var codes = new Uint8Array(256);
      for (let i2 = 0; i2 < alphabet.length; i2++) {
        codes[alphabet.charCodeAt(i2)] = i2;
      }
      codes[
        /* - */
        45
      ] = 62;
      codes[
        /* _ */
        95
      ] = 63;
      function byteLength(string) {
        let len = string.length;
        if (string.charCodeAt(len - 1) === 61) len--;
        if (len > 1 && string.charCodeAt(len - 1) === 61) len--;
        return len * 3 >>> 2;
      }
      function toString(buffer) {
        const len = buffer.byteLength;
        let result = "";
        for (let i2 = 0; i2 < len; i2 += 3) {
          result += alphabet[buffer[i2] >> 2] + alphabet[(buffer[i2] & 3) << 4 | buffer[i2 + 1] >> 4] + alphabet[(buffer[i2 + 1] & 15) << 2 | buffer[i2 + 2] >> 6] + alphabet[buffer[i2 + 2] & 63];
        }
        if (len % 3 === 2) {
          result = result.substring(0, result.length - 1) + "=";
        } else if (len % 3 === 1) {
          result = result.substring(0, result.length - 2) + "==";
        }
        return result;
      }
      function write(buffer, string) {
        const len = buffer.byteLength;
        for (let i2 = 0, j2 = 0; j2 < len; i2 += 4) {
          const a2 = codes[string.charCodeAt(i2)];
          const b2 = codes[string.charCodeAt(i2 + 1)];
          const c2 = codes[string.charCodeAt(i2 + 2)];
          const d2 = codes[string.charCodeAt(i2 + 3)];
          buffer[j2++] = a2 << 2 | b2 >> 4;
          buffer[j2++] = (b2 & 15) << 4 | c2 >> 2;
          buffer[j2++] = (c2 & 3) << 6 | d2 & 63;
        }
        return len;
      }
      module.exports = {
        byteLength,
        toString,
        write
      };
    }
  });

  // node_modules/b4a/lib/hex.js
  var require_hex = __commonJS({
    "node_modules/b4a/lib/hex.js"(exports, module) {
      function byteLength(string) {
        return string.length >>> 1;
      }
      function toString(buffer) {
        const len = buffer.byteLength;
        buffer = new DataView(buffer.buffer, buffer.byteOffset, len);
        let result = "";
        let i2 = 0;
        for (let n2 = len - len % 4; i2 < n2; i2 += 4) {
          result += buffer.getUint32(i2).toString(16).padStart(8, "0");
        }
        for (; i2 < len; i2++) {
          result += buffer.getUint8(i2).toString(16).padStart(2, "0");
        }
        return result;
      }
      function write(buffer, string) {
        const len = buffer.byteLength;
        for (let i2 = 0; i2 < len; i2++) {
          const a2 = hexValue(string.charCodeAt(i2 * 2));
          const b2 = hexValue(string.charCodeAt(i2 * 2 + 1));
          if (a2 === void 0 || b2 === void 0) {
            return i2;
          }
          buffer[i2] = a2 << 4 | b2;
        }
        return len;
      }
      module.exports = {
        byteLength,
        toString,
        write
      };
      function hexValue(char) {
        if (char >= 48 && char <= 57) return char - 48;
        if (char >= 65 && char <= 70) return char - 65 + 10;
        if (char >= 97 && char <= 102) return char - 97 + 10;
      }
    }
  });

  // node_modules/b4a/lib/latin1.js
  var require_latin1 = __commonJS({
    "node_modules/b4a/lib/latin1.js"(exports, module) {
      function byteLength(string) {
        return string.length;
      }
      function toString(buffer) {
        const len = buffer.byteLength;
        let result = "";
        for (let i2 = 0; i2 < len; i2++) {
          result += String.fromCharCode(buffer[i2]);
        }
        return result;
      }
      function write(buffer, string) {
        const len = buffer.byteLength;
        for (let i2 = 0; i2 < len; i2++) {
          buffer[i2] = string.charCodeAt(i2);
        }
        return len;
      }
      module.exports = {
        byteLength,
        toString,
        write
      };
    }
  });

  // node_modules/b4a/lib/utf8.js
  var require_utf8 = __commonJS({
    "node_modules/b4a/lib/utf8.js"(exports, module) {
      function byteLength(string) {
        let length = 0;
        for (let i2 = 0, n2 = string.length; i2 < n2; i2++) {
          const code = string.charCodeAt(i2);
          if (code >= 55296 && code <= 56319 && i2 + 1 < n2) {
            const code2 = string.charCodeAt(i2 + 1);
            if (code2 >= 56320 && code2 <= 57343) {
              length += 4;
              i2++;
              continue;
            }
          }
          if (code <= 127) length += 1;
          else if (code <= 2047) length += 2;
          else length += 3;
        }
        return length;
      }
      var toString;
      if (typeof TextDecoder !== "undefined") {
        const decoder = new TextDecoder();
        toString = function toString2(buffer) {
          return decoder.decode(buffer);
        };
      } else {
        toString = function toString2(buffer) {
          const len = buffer.byteLength;
          let output = "";
          let i2 = 0;
          while (i2 < len) {
            let byte = buffer[i2];
            if (byte <= 127) {
              output += String.fromCharCode(byte);
              i2++;
              continue;
            }
            let bytesNeeded = 0;
            let codePoint = 0;
            if (byte <= 223) {
              bytesNeeded = 1;
              codePoint = byte & 31;
            } else if (byte <= 239) {
              bytesNeeded = 2;
              codePoint = byte & 15;
            } else if (byte <= 244) {
              bytesNeeded = 3;
              codePoint = byte & 7;
            }
            if (len - i2 - bytesNeeded > 0) {
              let k2 = 0;
              while (k2 < bytesNeeded) {
                byte = buffer[i2 + k2 + 1];
                codePoint = codePoint << 6 | byte & 63;
                k2 += 1;
              }
            } else {
              codePoint = 65533;
              bytesNeeded = len - i2;
            }
            output += String.fromCodePoint(codePoint);
            i2 += bytesNeeded + 1;
          }
          return output;
        };
      }
      var write;
      if (typeof TextEncoder !== "undefined") {
        const encoder = new TextEncoder();
        write = function write2(buffer, string) {
          return encoder.encodeInto(string, buffer).written;
        };
      } else {
        write = function write2(buffer, string) {
          const len = buffer.byteLength;
          let i2 = 0;
          let j2 = 0;
          while (i2 < string.length) {
            const code = string.codePointAt(i2);
            if (code <= 127) {
              if (j2 + 1 > len) break;
              buffer[j2++] = code;
              i2++;
              continue;
            }
            let count = 0;
            let bits = 0;
            if (code <= 2047) {
              count = 6;
              bits = 192;
            } else if (code <= 65535) {
              count = 12;
              bits = 224;
            } else if (code <= 2097151) {
              count = 18;
              bits = 240;
            }
            if (j2 + count / 6 + 1 > len) break;
            buffer[j2++] = bits | code >> count;
            count -= 6;
            while (count >= 0) {
              buffer[j2++] = 128 | code >> count & 63;
              count -= 6;
            }
            i2 += code >= 65536 ? 2 : 1;
          }
          return j2;
        };
      }
      module.exports = {
        byteLength,
        toString,
        write
      };
    }
  });

  // node_modules/b4a/lib/utf16le.js
  var require_utf16le = __commonJS({
    "node_modules/b4a/lib/utf16le.js"(exports, module) {
      function byteLength(string) {
        return string.length * 2;
      }
      function toString(buffer) {
        const len = buffer.byteLength;
        let result = "";
        for (let i2 = 0; i2 < len - 1; i2 += 2) {
          result += String.fromCharCode(buffer[i2] + buffer[i2 + 1] * 256);
        }
        return result;
      }
      function write(buffer, string) {
        const len = buffer.byteLength;
        let units = len;
        for (let i2 = 0; i2 < string.length; ++i2) {
          if ((units -= 2) < 0) break;
          const c2 = string.charCodeAt(i2);
          const hi = c2 >> 8;
          const lo = c2 % 256;
          buffer[i2 * 2] = lo;
          buffer[i2 * 2 + 1] = hi;
        }
        return len;
      }
      module.exports = {
        byteLength,
        toString,
        write
      };
    }
  });

  // node_modules/b4a/browser.js
  var require_browser = __commonJS({
    "node_modules/b4a/browser.js"(exports, module) {
      var ascii = require_ascii();
      var base64 = require_base64();
      var hex = require_hex();
      var latin1 = require_latin1();
      var utf8 = require_utf8();
      var utf16le = require_utf16le();
      var LE = new Uint8Array(Uint16Array.of(255).buffer)[0] === 255;
      function codecFor(encoding) {
        switch (encoding) {
          case "ascii":
            return ascii;
          case "base64":
            return base64;
          case "hex":
            return hex;
          case "binary":
          case "latin1":
            return latin1;
          case "utf8":
          case "utf-8":
          case void 0:
          case null:
            return utf8;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16le;
          default:
            throw new Error(`Unknown encoding '${encoding}'`);
        }
      }
      function isBuffer(value) {
        return value instanceof Uint8Array;
      }
      function isEncoding(encoding) {
        try {
          codecFor(encoding);
          return true;
        } catch {
          return false;
        }
      }
      function alloc(size, fill2, encoding) {
        const buffer = new Uint8Array(size);
        if (fill2 !== void 0) {
          exports.fill(buffer, fill2, 0, buffer.byteLength, encoding);
        }
        return buffer;
      }
      function allocUnsafe(size) {
        return new Uint8Array(size);
      }
      function allocUnsafeSlow(size) {
        return new Uint8Array(size);
      }
      function byteLength(string, encoding) {
        return codecFor(encoding).byteLength(string);
      }
      function compare(a2, b2) {
        if (a2 === b2) return 0;
        const len = Math.min(a2.byteLength, b2.byteLength);
        a2 = new DataView(a2.buffer, a2.byteOffset, a2.byteLength);
        b2 = new DataView(b2.buffer, b2.byteOffset, b2.byteLength);
        let i2 = 0;
        for (let n2 = len - len % 4; i2 < n2; i2 += 4) {
          const x2 = a2.getUint32(i2, LE);
          const y2 = b2.getUint32(i2, LE);
          if (x2 !== y2) break;
        }
        for (; i2 < len; i2++) {
          const x2 = a2.getUint8(i2);
          const y2 = b2.getUint8(i2);
          if (x2 < y2) return -1;
          if (x2 > y2) return 1;
        }
        return a2.byteLength > b2.byteLength ? 1 : a2.byteLength < b2.byteLength ? -1 : 0;
      }
      function concat(buffers, length) {
        if (length === void 0) {
          length = buffers.reduce((len, buffer) => len + buffer.byteLength, 0);
        }
        const result = new Uint8Array(length);
        let offset = 0;
        for (const buffer of buffers) {
          if (offset + buffer.byteLength > result.byteLength) {
            result.set(buffer.subarray(0, result.byteLength - offset), offset);
            return result;
          }
          result.set(buffer, offset);
          offset += buffer.byteLength;
        }
        return result;
      }
      function copy(source, target, targetStart = 0, sourceStart = 0, sourceEnd = source.byteLength) {
        if (targetStart < 0) targetStart = 0;
        if (targetStart >= target.byteLength) return 0;
        const targetLength = target.byteLength - targetStart;
        if (sourceStart < 0) sourceStart = 0;
        if (sourceStart >= source.byteLength) return 0;
        if (sourceEnd <= sourceStart) return 0;
        if (sourceEnd > source.byteLength) sourceEnd = source.byteLength;
        if (sourceEnd - sourceStart > targetLength) {
          sourceEnd = sourceStart + targetLength;
        }
        const sourceLength = sourceEnd - sourceStart;
        if (source === target) {
          target.copyWithin(targetStart, sourceStart, sourceEnd);
        } else {
          if (sourceStart !== 0 || sourceEnd !== source.byteLength) {
            source = source.subarray(sourceStart, sourceEnd);
          }
          target.set(source, targetStart);
        }
        return sourceLength;
      }
      function equals(a2, b2) {
        if (a2 === b2) return true;
        if (a2.byteLength !== b2.byteLength) return false;
        return compare(a2, b2) === 0;
      }
      function fill(buffer, value, offset = 0, end = buffer.byteLength, encoding = "utf8") {
        if (typeof value === "string") {
          if (typeof offset === "string") {
            encoding = offset;
            offset = 0;
            end = buffer.byteLength;
          } else if (typeof end === "string") {
            encoding = end;
            end = buffer.byteLength;
          }
        } else if (typeof value === "number") {
          value = value & 255;
        } else if (typeof value === "boolean") {
          value = +value;
        }
        if (offset < 0) offset = 0;
        if (offset >= buffer.byteLength) return buffer;
        if (end <= offset) return buffer;
        if (end > buffer.byteLength) end = buffer.byteLength;
        if (typeof value === "number") return buffer.fill(value, offset, end);
        if (typeof value === "string") value = exports.from(value, encoding);
        const len = value.byteLength;
        for (let i2 = 0, n2 = end - offset; i2 < n2; ++i2) {
          buffer[i2 + offset] = value[i2 % len];
        }
        return buffer;
      }
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") return fromString(value, encodingOrOffset);
        if (Array.isArray(value)) return fromArray(value);
        if (ArrayBuffer.isView(value)) return fromBuffer(value);
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      function fromString(string, encoding) {
        const codec = codecFor(encoding);
        const buffer = new Uint8Array(codec.byteLength(string));
        codec.write(buffer, string);
        return buffer;
      }
      function fromArray(array) {
        const buffer = new Uint8Array(array.length);
        buffer.set(array);
        return buffer;
      }
      function fromBuffer(buffer) {
        const copy2 = new Uint8Array(buffer.byteLength);
        copy2.set(buffer);
        return copy2;
      }
      function fromArrayBuffer(arrayBuffer, byteOffset, length) {
        return new Uint8Array(arrayBuffer, byteOffset, length);
      }
      function includes(buffer, value, byteOffset, encoding) {
        return indexOf(buffer, value, byteOffset, encoding) !== -1;
      }
      function indexOf(buffer, value, byteOffset, encoding) {
        return bidirectionalIndexOf(
          buffer,
          value,
          byteOffset,
          encoding,
          true
          /* first */
        );
      }
      function lastIndexOf(buffer, value, byteOffset, encoding) {
        return bidirectionalIndexOf(
          buffer,
          value,
          byteOffset,
          encoding,
          false
          /* last */
        );
      }
      function bidirectionalIndexOf(buffer, value, byteOffset, encoding, first) {
        if (buffer.byteLength === 0) return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset === void 0) {
          byteOffset = first ? 0 : buffer.length - 1;
        } else if (byteOffset < 0) {
          byteOffset += buffer.byteLength;
        }
        if (byteOffset >= buffer.byteLength) {
          if (first) return -1;
          else byteOffset = buffer.byteLength - 1;
        } else if (byteOffset < 0) {
          if (first) byteOffset = 0;
          else return -1;
        }
        if (typeof value === "string") {
          value = from(value, encoding);
        } else if (typeof value === "number") {
          value = value & 255;
          if (first) {
            return buffer.indexOf(value, byteOffset);
          } else {
            return buffer.lastIndexOf(value, byteOffset);
          }
        }
        if (value.byteLength === 0) return -1;
        if (first) {
          let foundIndex = -1;
          for (let i2 = byteOffset; i2 < buffer.byteLength; i2++) {
            if (buffer[i2] === value[foundIndex === -1 ? 0 : i2 - foundIndex]) {
              if (foundIndex === -1) foundIndex = i2;
              if (i2 - foundIndex + 1 === value.byteLength) return foundIndex;
            } else {
              if (foundIndex !== -1) i2 -= i2 - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + value.byteLength > buffer.byteLength) {
            byteOffset = buffer.byteLength - value.byteLength;
          }
          for (let i2 = byteOffset; i2 >= 0; i2--) {
            let found = true;
            for (let j2 = 0; j2 < value.byteLength; j2++) {
              if (buffer[i2 + j2] !== value[j2]) {
                found = false;
                break;
              }
            }
            if (found) return i2;
          }
        }
        return -1;
      }
      function swap(buffer, n2, m2) {
        const i2 = buffer[n2];
        buffer[n2] = buffer[m2];
        buffer[m2] = i2;
      }
      function swap16(buffer) {
        const len = buffer.byteLength;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i2 = 0; i2 < len; i2 += 2) swap(buffer, i2, i2 + 1);
        return buffer;
      }
      function swap32(buffer) {
        const len = buffer.byteLength;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i2 = 0; i2 < len; i2 += 4) {
          swap(buffer, i2, i2 + 3);
          swap(buffer, i2 + 1, i2 + 2);
        }
        return buffer;
      }
      function swap64(buffer) {
        const len = buffer.byteLength;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i2 = 0; i2 < len; i2 += 8) {
          swap(buffer, i2, i2 + 7);
          swap(buffer, i2 + 1, i2 + 6);
          swap(buffer, i2 + 2, i2 + 5);
          swap(buffer, i2 + 3, i2 + 4);
        }
        return buffer;
      }
      function toBuffer(buffer) {
        return buffer;
      }
      function toString(buffer, encoding = "utf8", start = 0, end = buffer.byteLength) {
        if (arguments.length === 1) return utf8.toString(buffer);
        if (arguments.length === 2) return codecFor(encoding).toString(buffer);
        if (start < 0) start = 0;
        if (start >= buffer.byteLength) return "";
        if (end <= start) return "";
        if (end > buffer.byteLength) end = buffer.byteLength;
        if (start !== 0 || end !== buffer.byteLength) {
          buffer = buffer.subarray(start, end);
        }
        return codecFor(encoding).toString(buffer);
      }
      function toHex2(buffer, start, end) {
        return toString(buffer, "hex", start, end);
      }
      function write(buffer, string, offset = 0, length = buffer.byteLength, encoding) {
        if (arguments.length === 2) return utf8.write(buffer, string);
        if (typeof offset === "string") {
          encoding = offset;
          offset = 0;
          length = buffer.byteLength;
        } else if (typeof length === "string") {
          encoding = length;
          length = buffer.byteLength - offset;
        }
        length = Math.min(length, exports.byteLength(string, encoding));
        let start = offset;
        if (start < 0) start = 0;
        if (start >= buffer.byteLength) return 0;
        let end = offset + length;
        if (end <= start) return 0;
        if (end > buffer.byteLength) end = buffer.byteLength;
        if (start !== 0 || end !== buffer.byteLength) {
          buffer = buffer.subarray(start, end);
        }
        return codecFor(encoding).write(buffer, string);
      }
      function readDoubleBE(buffer, offset = 0) {
        const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        return view.getFloat64(offset, false);
      }
      function readDoubleLE(buffer, offset = 0) {
        const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        return view.getFloat64(offset, true);
      }
      function readFloatBE(buffer, offset = 0) {
        const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        return view.getFloat32(offset, false);
      }
      function readFloatLE(buffer, offset = 0) {
        const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        return view.getFloat32(offset, true);
      }
      function readInt32BE(buffer, offset = 0) {
        const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        return view.getInt32(offset, false);
      }
      function readInt32LE(buffer, offset = 0) {
        const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        return view.getInt32(offset, true);
      }
      function readUInt32BE(buffer, offset = 0) {
        const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        return view.getUint32(offset, false);
      }
      function readUInt32LE(buffer, offset = 0) {
        const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        return view.getUint32(offset, true);
      }
      function writeDoubleBE(buffer, value, offset = 0) {
        const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        view.setFloat64(offset, value, false);
        return offset + 8;
      }
      function writeDoubleLE(buffer, value, offset = 0) {
        const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        view.setFloat64(offset, value, true);
        return offset + 8;
      }
      function writeFloatBE(buffer, value, offset = 0) {
        const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        view.setFloat32(offset, value, false);
        return offset + 4;
      }
      function writeFloatLE(buffer, value, offset = 0) {
        const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        view.setFloat32(offset, value, true);
        return offset + 4;
      }
      function writeInt32BE(buffer, value, offset = 0) {
        const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        view.setInt32(offset, value, false);
        return offset + 4;
      }
      function writeInt32LE(buffer, value, offset = 0) {
        const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        view.setInt32(offset, value, true);
        return offset + 4;
      }
      function writeUInt32BE(buffer, value, offset = 0) {
        const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        view.setUint32(offset, value, false);
        return offset + 4;
      }
      function writeUInt32LE(buffer, value, offset = 0) {
        const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        view.setUint32(offset, value, true);
        return offset + 4;
      }
      module.exports = exports = {
        isBuffer,
        isEncoding,
        alloc,
        allocUnsafe,
        allocUnsafeSlow,
        byteLength,
        compare,
        concat,
        copy,
        equals,
        fill,
        from,
        includes,
        indexOf,
        lastIndexOf,
        swap16,
        swap32,
        swap64,
        toBuffer,
        toString,
        toHex: toHex2,
        write,
        readDoubleBE,
        readDoubleLE,
        readFloatBE,
        readFloatLE,
        readInt32BE,
        readInt32LE,
        readUInt32BE,
        readUInt32LE,
        writeDoubleBE,
        writeDoubleLE,
        writeFloatBE,
        writeFloatLE,
        writeInt32BE,
        writeInt32LE,
        writeUInt32BE,
        writeUInt32LE
      };
    }
  });

  // (disabled):crypto
  var require_crypto = __commonJS({
    "(disabled):crypto"() {
    }
  });

  // node_modules/sodium-javascript/randombytes.js
  var require_randombytes = __commonJS({
    "node_modules/sodium-javascript/randombytes.js"(exports, module) {
      var assert = require_nanoassert();
      var randombytes = (function() {
        var QUOTA = 65536;
        var crypto2 = globalThis.crypto || globalThis.msCrypto;
        function browserBytes(out, n2) {
          for (let i2 = 0; i2 < n2; i2 += QUOTA) {
            crypto2.getRandomValues(new Uint8Array(out.buffer, i2 + out.byteOffset, Math.min(n2 - i2, QUOTA)));
          }
        }
        function nodeBytes(out, n2) {
          new Uint8Array(out.buffer, out.byteOffset, n2).set(crypto2.randomBytes(n2));
        }
        function noImpl() {
          throw new Error("No secure random number generator available");
        }
        if (crypto2 && crypto2.getRandomValues) return browserBytes;
        if (__require != null) {
          crypto2 = require_crypto();
          if (crypto2 && crypto2.randomBytes) return nodeBytes;
        }
        return noImpl;
      })();
      Object.defineProperty(module.exports, "randombytes", {
        value: randombytes
      });
      module.exports.randombytes_buf = function(out) {
        assert(out, "out must be given");
        randombytes(out, out.byteLength);
      };
    }
  });

  // (disabled):worker_threads
  var require_worker_threads = __commonJS({
    "(disabled):worker_threads"() {
    }
  });

  // node_modules/sodium-javascript/memory.js
  var require_memory = __commonJS({
    "node_modules/sodium-javascript/memory.js"(exports, module) {
      function sodium_malloc(n2) {
        return new Uint8Array(n2);
      }
      function sodium_free(n2) {
        sodium_memzero(n2);
        loadSink().port1.postMessage(n2.buffer, [n2.buffer]);
      }
      function sodium_memzero(arr) {
        arr.fill(0);
      }
      var sink;
      function loadSink() {
        if (sink) return sink;
        var MessageChannel = globalThis.MessageChannel;
        if (MessageChannel == null) ({ MessageChannel } = require_worker_threads());
        sink = new MessageChannel();
        return sink;
      }
      module.exports = {
        sodium_malloc,
        sodium_free,
        sodium_memzero
      };
    }
  });

  // node_modules/sodium-javascript/crypto_verify.js
  var require_crypto_verify = __commonJS({
    "node_modules/sodium-javascript/crypto_verify.js"(exports, module) {
      module.exports = {
        crypto_verify_16,
        crypto_verify_32,
        crypto_verify_64
      };
      function vn(x2, xi, y2, yi, n2) {
        var d2 = 0;
        for (let i2 = 0; i2 < n2; i2++) d2 |= x2[xi + i2] ^ y2[yi + i2];
        return (1 & d2 - 1 >>> 8) - 1;
      }
      Object.defineProperty(module.exports, "vn", {
        value: vn
      });
      function crypto_verify_16(x2, xi, y2, yi) {
        return vn(x2, xi, y2, yi, 16) === 0;
      }
      function crypto_verify_32(x2, xi, y2, yi) {
        return vn(x2, xi, y2, yi, 32) === 0;
      }
      function crypto_verify_64(x2, xi, y2, yi) {
        return vn(x2, xi, y2, yi, 64) === 0;
      }
    }
  });

  // node_modules/sodium-javascript/helpers.js
  var require_helpers = __commonJS({
    "node_modules/sodium-javascript/helpers.js"(exports, module) {
      var assert = require_nanoassert();
      var { vn } = require_crypto_verify();
      function sodium_increment(n2) {
        const nlen = n2.byteLength;
        var c2 = 1;
        for (var i2 = 0; i2 < nlen; i2++) {
          c2 += n2[i2];
          n2[i2] = c2;
          c2 >>= 8;
        }
      }
      function sodium_memcmp(a2, b2) {
        assert(a2.byteLength === b2.byteLength, "buffers must be the same size");
        return vn(a2, 0, b2, 0, a2.byteLength) === 0;
      }
      function sodium_is_zero(arr) {
        var d2 = 0;
        for (let i2 = 0; i2 < arr.length; i2++) d2 |= arr[i2];
        return d2 === 0;
      }
      module.exports = {
        sodium_increment,
        sodium_memcmp,
        sodium_is_zero
      };
    }
  });

  // node_modules/sha512-universal/sha512.js
  var require_sha512 = __commonJS({
    "node_modules/sha512-universal/sha512.js"(exports, module) {
      var assert = require_nanoassert();
      var b4a = require_browser();
      module.exports = Sha512;
      var BLOCKSIZE = 128;
      var K2 = [
        1116352408,
        3609767458,
        1899447441,
        602891725,
        3049323471,
        3964484399,
        3921009573,
        2173295548,
        961987163,
        4081628472,
        1508970993,
        3053834265,
        2453635748,
        2937671579,
        2870763221,
        3664609560,
        3624381080,
        2734883394,
        310598401,
        1164996542,
        607225278,
        1323610764,
        1426881987,
        3590304994,
        1925078388,
        4068182383,
        2162078206,
        991336113,
        2614888103,
        633803317,
        3248222580,
        3479774868,
        3835390401,
        2666613458,
        4022224774,
        944711139,
        264347078,
        2341262773,
        604807628,
        2007800933,
        770255983,
        1495990901,
        1249150122,
        1856431235,
        1555081692,
        3175218132,
        1996064986,
        2198950837,
        2554220882,
        3999719339,
        2821834349,
        766784016,
        2952996808,
        2566594879,
        3210313671,
        3203337956,
        3336571891,
        1034457026,
        3584528711,
        2466948901,
        113926993,
        3758326383,
        338241895,
        168717936,
        666307205,
        1188179964,
        773529912,
        1546045734,
        1294757372,
        1522805485,
        1396182291,
        2643833823,
        1695183700,
        2343527390,
        1986661051,
        1014477480,
        2177026350,
        1206759142,
        2456956037,
        344077627,
        2730485921,
        1290863460,
        2820302411,
        3158454273,
        3259730800,
        3505952657,
        3345764771,
        106217008,
        3516065817,
        3606008344,
        3600352804,
        1432725776,
        4094571909,
        1467031594,
        275423344,
        851169720,
        430227734,
        3100823752,
        506948616,
        1363258195,
        659060556,
        3750685593,
        883997877,
        3785050280,
        958139571,
        3318307427,
        1322822218,
        3812723403,
        1537002063,
        2003034995,
        1747873779,
        3602036899,
        1955562222,
        1575990012,
        2024104815,
        1125592928,
        2227730452,
        2716904306,
        2361852424,
        442776044,
        2428436474,
        593698344,
        2756734187,
        3733110249,
        3204031479,
        2999351573,
        3329325298,
        3815920427,
        3391569614,
        3928383900,
        3515267271,
        566280711,
        3940187606,
        3454069534,
        4118630271,
        4000239992,
        116418474,
        1914138554,
        174292421,
        2731055270,
        289380356,
        3203993006,
        460393269,
        320620315,
        685471733,
        587496836,
        852142971,
        1086792851,
        1017036298,
        365543100,
        1126000580,
        2618297676,
        1288033470,
        3409855158,
        1501505948,
        4234509866,
        1607167915,
        987167468,
        1816402316,
        1246189591
      ];
      function Sha512() {
        if (!(this instanceof Sha512)) return new Sha512();
        this.hh = new Int32Array(8);
        this.hl = new Int32Array(8);
        this.buffer = new Uint8Array(128);
        this.finalised = false;
        this.bytesRead = 0;
        this.pos = 0;
        this.hh[0] = 1779033703;
        this.hh[1] = 3144134277;
        this.hh[2] = 1013904242;
        this.hh[3] = 2773480762;
        this.hh[4] = 1359893119;
        this.hh[5] = 2600822924;
        this.hh[6] = 528734635;
        this.hh[7] = 1541459225;
        this.hl[0] = 4089235720;
        this.hl[1] = 2227873595;
        this.hl[2] = 4271175723;
        this.hl[3] = 1595750129;
        this.hl[4] = 2917565137;
        this.hl[5] = 725511199;
        this.hl[6] = 4215389547;
        this.hl[7] = 327033209;
        return this;
      }
      Sha512.prototype.update = function(input, enc2) {
        assert(this.finalised === false, "Hash instance finalised");
        var [inputBuf, len] = formatInput(input, enc2);
        this.bytesRead += len;
        const full = len + this.pos & -128;
        this.buffer.set(inputBuf.subarray(0, BLOCKSIZE - this.pos), this.pos);
        const pos = this.pos;
        len -= BLOCKSIZE - this.pos;
        if (len >= 0) {
          compress(this.hh, this.hl, this.buffer, 128);
          this.pos = 0;
        }
        if (len > 127) {
          compress(this.hh, this.hl, inputBuf.subarray(BLOCKSIZE - pos, full - pos), full - BLOCKSIZE);
          len %= 128;
        }
        this.buffer.set(inputBuf.subarray(inputBuf.byteLength - len));
        this.pos = this.bytesRead & 127;
        this.buffer.fill(0, this.pos);
        return this;
      };
      Sha512.prototype.digest = function(enc2, offset = 0) {
        assert(this.finalised === false, "Hash instance finalised");
        this.finalised = true;
        this.buffer.fill(0, this.pos);
        this.buffer[this.pos] = 128;
        if (this.pos > 111) {
          compress(this.hh, this.hl, this.buffer, 128);
          this.buffer.fill(0);
          this.pos = 0;
        }
        ts64(this.buffer, 120, this.bytesRead / 536870912 | 0, this.bytesRead << 3);
        compress(this.hh, this.hl, this.buffer, 128);
        if (enc2 instanceof Uint8Array && enc2.byteLength > 63) {
          for (let i2 = 0; i2 < 8; i2++) ts64(enc2, 8 * i2 + offset, this.hh[i2], this.hl[i2]);
          return enc2;
        }
        const resultBuf = new Uint8Array(64);
        for (let i2 = 0; i2 < 8; i2++) ts64(resultBuf, 8 * i2, this.hh[i2], this.hl[i2]);
        if (typeof enc2 === "string") {
          return b4a.toString(resultBuf, enc2);
        }
        return resultBuf;
      };
      function ts64(x2, i2, h2, l2) {
        x2[i2] = h2 >> 24 & 255;
        x2[i2 + 1] = h2 >> 16 & 255;
        x2[i2 + 2] = h2 >> 8 & 255;
        x2[i2 + 3] = h2 & 255;
        x2[i2 + 4] = l2 >> 24 & 255;
        x2[i2 + 5] = l2 >> 16 & 255;
        x2[i2 + 6] = l2 >> 8 & 255;
        x2[i2 + 7] = l2 & 255;
      }
      function formatInput(input, enc2) {
        var result = b4a.from(input, enc2);
        return [result, result.byteLength];
      }
      function compress(hh, hl, m2, n2) {
        var wh = new Int32Array(16), wl = new Int32Array(16), bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7, bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7, th, tl, i2, j2, h2, l2, a2, b2, c2, d2;
        var ah0 = hh[0], ah1 = hh[1], ah2 = hh[2], ah3 = hh[3], ah4 = hh[4], ah5 = hh[5], ah6 = hh[6], ah7 = hh[7], al0 = hl[0], al1 = hl[1], al2 = hl[2], al3 = hl[3], al4 = hl[4], al5 = hl[5], al6 = hl[6], al7 = hl[7];
        var pos = 0;
        while (n2 >= 128) {
          for (i2 = 0; i2 < 16; i2++) {
            j2 = 8 * i2 + pos;
            wh[i2] = m2[j2 + 0] << 24 | m2[j2 + 1] << 16 | m2[j2 + 2] << 8 | m2[j2 + 3];
            wl[i2] = m2[j2 + 4] << 24 | m2[j2 + 5] << 16 | m2[j2 + 6] << 8 | m2[j2 + 7];
          }
          for (i2 = 0; i2 < 80; i2++) {
            bh0 = ah0;
            bh1 = ah1;
            bh2 = ah2;
            bh3 = ah3;
            bh4 = ah4;
            bh5 = ah5;
            bh6 = ah6;
            bh7 = ah7;
            bl0 = al0;
            bl1 = al1;
            bl2 = al2;
            bl3 = al3;
            bl4 = al4;
            bl5 = al5;
            bl6 = al6;
            bl7 = al7;
            h2 = ah7;
            l2 = al7;
            a2 = l2 & 65535;
            b2 = l2 >>> 16;
            c2 = h2 & 65535;
            d2 = h2 >>> 16;
            h2 = (ah4 >>> 14 | al4 << 32 - 14) ^ (ah4 >>> 18 | al4 << 32 - 18) ^ (al4 >>> 41 - 32 | ah4 << 32 - (41 - 32));
            l2 = (al4 >>> 14 | ah4 << 32 - 14) ^ (al4 >>> 18 | ah4 << 32 - 18) ^ (ah4 >>> 41 - 32 | al4 << 32 - (41 - 32));
            a2 += l2 & 65535;
            b2 += l2 >>> 16;
            c2 += h2 & 65535;
            d2 += h2 >>> 16;
            h2 = ah4 & ah5 ^ ~ah4 & ah6;
            l2 = al4 & al5 ^ ~al4 & al6;
            a2 += l2 & 65535;
            b2 += l2 >>> 16;
            c2 += h2 & 65535;
            d2 += h2 >>> 16;
            h2 = K2[i2 * 2];
            l2 = K2[i2 * 2 + 1];
            a2 += l2 & 65535;
            b2 += l2 >>> 16;
            c2 += h2 & 65535;
            d2 += h2 >>> 16;
            h2 = wh[i2 % 16];
            l2 = wl[i2 % 16];
            a2 += l2 & 65535;
            b2 += l2 >>> 16;
            c2 += h2 & 65535;
            d2 += h2 >>> 16;
            b2 += a2 >>> 16;
            c2 += b2 >>> 16;
            d2 += c2 >>> 16;
            th = c2 & 65535 | d2 << 16;
            tl = a2 & 65535 | b2 << 16;
            h2 = th;
            l2 = tl;
            a2 = l2 & 65535;
            b2 = l2 >>> 16;
            c2 = h2 & 65535;
            d2 = h2 >>> 16;
            h2 = (ah0 >>> 28 | al0 << 32 - 28) ^ (al0 >>> 34 - 32 | ah0 << 32 - (34 - 32)) ^ (al0 >>> 39 - 32 | ah0 << 32 - (39 - 32));
            l2 = (al0 >>> 28 | ah0 << 32 - 28) ^ (ah0 >>> 34 - 32 | al0 << 32 - (34 - 32)) ^ (ah0 >>> 39 - 32 | al0 << 32 - (39 - 32));
            a2 += l2 & 65535;
            b2 += l2 >>> 16;
            c2 += h2 & 65535;
            d2 += h2 >>> 16;
            h2 = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2;
            l2 = al0 & al1 ^ al0 & al2 ^ al1 & al2;
            a2 += l2 & 65535;
            b2 += l2 >>> 16;
            c2 += h2 & 65535;
            d2 += h2 >>> 16;
            b2 += a2 >>> 16;
            c2 += b2 >>> 16;
            d2 += c2 >>> 16;
            bh7 = c2 & 65535 | d2 << 16;
            bl7 = a2 & 65535 | b2 << 16;
            h2 = bh3;
            l2 = bl3;
            a2 = l2 & 65535;
            b2 = l2 >>> 16;
            c2 = h2 & 65535;
            d2 = h2 >>> 16;
            h2 = th;
            l2 = tl;
            a2 += l2 & 65535;
            b2 += l2 >>> 16;
            c2 += h2 & 65535;
            d2 += h2 >>> 16;
            b2 += a2 >>> 16;
            c2 += b2 >>> 16;
            d2 += c2 >>> 16;
            bh3 = c2 & 65535 | d2 << 16;
            bl3 = a2 & 65535 | b2 << 16;
            ah1 = bh0;
            ah2 = bh1;
            ah3 = bh2;
            ah4 = bh3;
            ah5 = bh4;
            ah6 = bh5;
            ah7 = bh6;
            ah0 = bh7;
            al1 = bl0;
            al2 = bl1;
            al3 = bl2;
            al4 = bl3;
            al5 = bl4;
            al6 = bl5;
            al7 = bl6;
            al0 = bl7;
            if (i2 % 16 === 15) {
              for (j2 = 0; j2 < 16; j2++) {
                h2 = wh[j2];
                l2 = wl[j2];
                a2 = l2 & 65535;
                b2 = l2 >>> 16;
                c2 = h2 & 65535;
                d2 = h2 >>> 16;
                h2 = wh[(j2 + 9) % 16];
                l2 = wl[(j2 + 9) % 16];
                a2 += l2 & 65535;
                b2 += l2 >>> 16;
                c2 += h2 & 65535;
                d2 += h2 >>> 16;
                th = wh[(j2 + 1) % 16];
                tl = wl[(j2 + 1) % 16];
                h2 = (th >>> 1 | tl << 32 - 1) ^ (th >>> 8 | tl << 32 - 8) ^ th >>> 7;
                l2 = (tl >>> 1 | th << 32 - 1) ^ (tl >>> 8 | th << 32 - 8) ^ (tl >>> 7 | th << 32 - 7);
                a2 += l2 & 65535;
                b2 += l2 >>> 16;
                c2 += h2 & 65535;
                d2 += h2 >>> 16;
                th = wh[(j2 + 14) % 16];
                tl = wl[(j2 + 14) % 16];
                h2 = (th >>> 19 | tl << 32 - 19) ^ (tl >>> 61 - 32 | th << 32 - (61 - 32)) ^ th >>> 6;
                l2 = (tl >>> 19 | th << 32 - 19) ^ (th >>> 61 - 32 | tl << 32 - (61 - 32)) ^ (tl >>> 6 | th << 32 - 6);
                a2 += l2 & 65535;
                b2 += l2 >>> 16;
                c2 += h2 & 65535;
                d2 += h2 >>> 16;
                b2 += a2 >>> 16;
                c2 += b2 >>> 16;
                d2 += c2 >>> 16;
                wh[j2] = c2 & 65535 | d2 << 16;
                wl[j2] = a2 & 65535 | b2 << 16;
              }
            }
          }
          h2 = ah0;
          l2 = al0;
          a2 = l2 & 65535;
          b2 = l2 >>> 16;
          c2 = h2 & 65535;
          d2 = h2 >>> 16;
          h2 = hh[0];
          l2 = hl[0];
          a2 += l2 & 65535;
          b2 += l2 >>> 16;
          c2 += h2 & 65535;
          d2 += h2 >>> 16;
          b2 += a2 >>> 16;
          c2 += b2 >>> 16;
          d2 += c2 >>> 16;
          hh[0] = ah0 = c2 & 65535 | d2 << 16;
          hl[0] = al0 = a2 & 65535 | b2 << 16;
          h2 = ah1;
          l2 = al1;
          a2 = l2 & 65535;
          b2 = l2 >>> 16;
          c2 = h2 & 65535;
          d2 = h2 >>> 16;
          h2 = hh[1];
          l2 = hl[1];
          a2 += l2 & 65535;
          b2 += l2 >>> 16;
          c2 += h2 & 65535;
          d2 += h2 >>> 16;
          b2 += a2 >>> 16;
          c2 += b2 >>> 16;
          d2 += c2 >>> 16;
          hh[1] = ah1 = c2 & 65535 | d2 << 16;
          hl[1] = al1 = a2 & 65535 | b2 << 16;
          h2 = ah2;
          l2 = al2;
          a2 = l2 & 65535;
          b2 = l2 >>> 16;
          c2 = h2 & 65535;
          d2 = h2 >>> 16;
          h2 = hh[2];
          l2 = hl[2];
          a2 += l2 & 65535;
          b2 += l2 >>> 16;
          c2 += h2 & 65535;
          d2 += h2 >>> 16;
          b2 += a2 >>> 16;
          c2 += b2 >>> 16;
          d2 += c2 >>> 16;
          hh[2] = ah2 = c2 & 65535 | d2 << 16;
          hl[2] = al2 = a2 & 65535 | b2 << 16;
          h2 = ah3;
          l2 = al3;
          a2 = l2 & 65535;
          b2 = l2 >>> 16;
          c2 = h2 & 65535;
          d2 = h2 >>> 16;
          h2 = hh[3];
          l2 = hl[3];
          a2 += l2 & 65535;
          b2 += l2 >>> 16;
          c2 += h2 & 65535;
          d2 += h2 >>> 16;
          b2 += a2 >>> 16;
          c2 += b2 >>> 16;
          d2 += c2 >>> 16;
          hh[3] = ah3 = c2 & 65535 | d2 << 16;
          hl[3] = al3 = a2 & 65535 | b2 << 16;
          h2 = ah4;
          l2 = al4;
          a2 = l2 & 65535;
          b2 = l2 >>> 16;
          c2 = h2 & 65535;
          d2 = h2 >>> 16;
          h2 = hh[4];
          l2 = hl[4];
          a2 += l2 & 65535;
          b2 += l2 >>> 16;
          c2 += h2 & 65535;
          d2 += h2 >>> 16;
          b2 += a2 >>> 16;
          c2 += b2 >>> 16;
          d2 += c2 >>> 16;
          hh[4] = ah4 = c2 & 65535 | d2 << 16;
          hl[4] = al4 = a2 & 65535 | b2 << 16;
          h2 = ah5;
          l2 = al5;
          a2 = l2 & 65535;
          b2 = l2 >>> 16;
          c2 = h2 & 65535;
          d2 = h2 >>> 16;
          h2 = hh[5];
          l2 = hl[5];
          a2 += l2 & 65535;
          b2 += l2 >>> 16;
          c2 += h2 & 65535;
          d2 += h2 >>> 16;
          b2 += a2 >>> 16;
          c2 += b2 >>> 16;
          d2 += c2 >>> 16;
          hh[5] = ah5 = c2 & 65535 | d2 << 16;
          hl[5] = al5 = a2 & 65535 | b2 << 16;
          h2 = ah6;
          l2 = al6;
          a2 = l2 & 65535;
          b2 = l2 >>> 16;
          c2 = h2 & 65535;
          d2 = h2 >>> 16;
          h2 = hh[6];
          l2 = hl[6];
          a2 += l2 & 65535;
          b2 += l2 >>> 16;
          c2 += h2 & 65535;
          d2 += h2 >>> 16;
          b2 += a2 >>> 16;
          c2 += b2 >>> 16;
          d2 += c2 >>> 16;
          hh[6] = ah6 = c2 & 65535 | d2 << 16;
          hl[6] = al6 = a2 & 65535 | b2 << 16;
          h2 = ah7;
          l2 = al7;
          a2 = l2 & 65535;
          b2 = l2 >>> 16;
          c2 = h2 & 65535;
          d2 = h2 >>> 16;
          h2 = hh[7];
          l2 = hl[7];
          a2 += l2 & 65535;
          b2 += l2 >>> 16;
          c2 += h2 & 65535;
          d2 += h2 >>> 16;
          b2 += a2 >>> 16;
          c2 += b2 >>> 16;
          d2 += c2 >>> 16;
          hh[7] = ah7 = c2 & 65535 | d2 << 16;
          hl[7] = al7 = a2 & 65535 | b2 << 16;
          pos += 128;
          n2 -= 128;
        }
      }
      function HMAC(key) {
        if (!(this instanceof HMAC)) return new HMAC(key);
        this.pad = b4a.alloc(128);
        this.inner = Sha512();
        this.outer = Sha512();
        const keyhash = b4a.alloc(64);
        if (key.byteLength > 128) {
          Sha512().update(key).digest(keyhash);
          key = keyhash;
        }
        this.pad.fill(54);
        for (let i2 = 0; i2 < key.byteLength; i2++) {
          this.pad[i2] ^= key[i2];
        }
        this.inner.update(this.pad);
        this.pad.fill(92);
        for (let i2 = 0; i2 < key.byteLength; i2++) {
          this.pad[i2] ^= key[i2];
        }
        this.outer.update(this.pad);
        this.pad.fill(0);
        keyhash.fill(0);
      }
      HMAC.prototype.update = function(input, enc2) {
        this.inner.update(input, enc2);
        return this;
      };
      HMAC.prototype.digest = function(enc2, offset = 0) {
        this.outer.update(this.inner.digest());
        return this.outer.digest(enc2, offset);
      };
      Sha512.HMAC = HMAC;
    }
  });

  // node_modules/sha512-wasm/sha512.js
  var require_sha5122 = __commonJS({
    "node_modules/sha512-wasm/sha512.js"(exports, module) {
      var __commonJS2 = (cb, mod) => function __require2() {
        return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
      };
      var __toBinary = /* @__PURE__ */ (() => {
        var table = new Uint8Array(128);
        for (var i2 = 0; i2 < 64; i2++)
          table[i2 < 26 ? i2 + 65 : i2 < 52 ? i2 + 71 : i2 < 62 ? i2 - 4 : i2 * 4 - 205] = i2;
        return (base64) => {
          var n2 = base64.length, bytes2 = new Uint8Array((n2 - (base64[n2 - 1] == "=") - (base64[n2 - 2] == "=")) * 3 / 4 | 0);
          for (var i22 = 0, j2 = 0; i22 < n2; ) {
            var c0 = table[base64.charCodeAt(i22++)], c1 = table[base64.charCodeAt(i22++)];
            var c2 = table[base64.charCodeAt(i22++)], c3 = table[base64.charCodeAt(i22++)];
            bytes2[j2++] = c0 << 2 | c1 >> 4;
            bytes2[j2++] = c1 << 4 | c2 >> 2;
            bytes2[j2++] = c2 << 6 | c3;
          }
          return bytes2;
        };
      })();
      var require_sha5123 = __commonJS2({
        "wasm-binary:./sha512.wat"(exports2, module2) {
          module2.exports = __toBinary("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");
        }
      });
      var bytes = require_sha5123();
      var compiled = new WebAssembly.Module(bytes);
      module.exports = (imports) => {
        const instance = new WebAssembly.Instance(compiled, imports);
        return instance.exports;
      };
    }
  });

  // node_modules/sha512-wasm/index.js
  var require_sha512_wasm = __commonJS({
    "node_modules/sha512-wasm/index.js"(exports, module) {
      var assert = require_nanoassert();
      var b4a = require_browser();
      var wasm = typeof WebAssembly !== "undefined" && require_sha5122()({
        imports: {
          debug: {
            log(...args) {
              console.log(...args.map((int) => (int >>> 0).toString(16).padStart(8, "0")));
            },
            log_tee(arg) {
              console.log((arg >>> 0).toString(16).padStart(8, "0"));
              return arg;
            }
          }
        }
      });
      var head = 0;
      var freeList = [];
      module.exports = Sha512;
      var SHA512_BYTES = module.exports.SHA512_BYTES = 64;
      var INPUT_OFFSET = 80;
      var STATEBYTES = 216;
      var BLOCKSIZE = 128;
      function Sha512() {
        if (!(this instanceof Sha512)) return new Sha512();
        if (!wasm) throw new Error("WASM not loaded. Wait for Sha512.ready(cb)");
        if (!freeList.length) {
          freeList.push(head);
          head += STATEBYTES;
        }
        this.finalized = false;
        this.digestLength = SHA512_BYTES;
        this.pointer = freeList.pop();
        this.pos = 0;
        this.wasm = wasm;
        this._memory = new Uint8Array(wasm.memory.buffer);
        this._memory.fill(0, this.pointer, this.pointer + STATEBYTES);
        if (this.pointer + this.digestLength > this._memory.length) this._realloc(this.pointer + STATEBYTES);
      }
      Sha512.prototype._realloc = function(size) {
        wasm.memory.grow(Math.max(0, Math.ceil(Math.abs(size - this._memory.length) / 65536)));
        this._memory = new Uint8Array(wasm.memory.buffer);
      };
      Sha512.prototype.update = function(input, enc2) {
        assert(this.finalized === false, "Hash instance finalized");
        if (head % 8 !== 0) head += 8 - head % 8;
        assert(head % 8 === 0, "input should be aligned for int64");
        const [inputBuf, length] = formatInput(input, enc2);
        assert(inputBuf instanceof Uint8Array, "input must be Uint8Array or Buffer");
        if (head + input.length > this._memory.length) this._realloc(head + input.length);
        this._memory.fill(0, head, head + roundUp(length, BLOCKSIZE) - BLOCKSIZE);
        this._memory.set(inputBuf.subarray(0, BLOCKSIZE - this.pos), this.pointer + INPUT_OFFSET + this.pos);
        this._memory.set(inputBuf.subarray(BLOCKSIZE - this.pos), head);
        this.pos = this.pos + length & 127;
        wasm.sha512(this.pointer, head, length, 0);
        return this;
      };
      Sha512.prototype.digest = function(enc2, offset = 0) {
        assert(this.finalized === false, "Hash instance finalized");
        this.finalized = true;
        freeList.push(this.pointer);
        const paddingStart = this.pointer + INPUT_OFFSET + this.pos;
        this._memory.fill(0, paddingStart, this.pointer + INPUT_OFFSET + BLOCKSIZE);
        wasm.sha512(this.pointer, head, 0, 1);
        const resultBuf = this._memory.subarray(this.pointer, this.pointer + this.digestLength);
        if (!enc2) {
          return resultBuf;
        }
        if (typeof enc2 === "string") {
          return b4a.toString(resultBuf, enc2);
        }
        assert(enc2 instanceof Uint8Array, "output must be Uint8Array or Buffer");
        assert(
          enc2.byteLength >= this.digestLength + offset,
          "output must have at least 'SHA512_BYTES' bytes remaining"
        );
        for (let i2 = 0; i2 < this.digestLength; i2++) {
          enc2[i2 + offset] = resultBuf[i2];
        }
        return enc2;
      };
      Sha512.WASM = wasm;
      Sha512.WASM_SUPPORTED = typeof WebAssembly !== "undefined";
      Sha512.ready = function(cb) {
        if (!cb) cb = noop;
        if (!wasm) return cb(new Error("WebAssembly not supported"));
        cb();
        return Promise.resolve();
      };
      Sha512.prototype.ready = Sha512.ready;
      function HMAC(key) {
        if (!(this instanceof HMAC)) return new HMAC(key);
        this.pad = b4a.alloc(128);
        this.inner = Sha512();
        this.outer = Sha512();
        const keyhash = b4a.alloc(64);
        if (key.byteLength > 128) {
          Sha512().update(key).digest(keyhash);
          key = keyhash;
        }
        this.pad.fill(54);
        for (let i2 = 0; i2 < key.byteLength; i2++) {
          this.pad[i2] ^= key[i2];
        }
        this.inner.update(this.pad);
        this.pad.fill(92);
        for (let i2 = 0; i2 < key.byteLength; i2++) {
          this.pad[i2] ^= key[i2];
        }
        this.outer.update(this.pad);
        this.pad.fill(0);
        keyhash.fill(0);
      }
      HMAC.prototype.update = function(input, enc2) {
        this.inner.update(input, enc2);
        return this;
      };
      HMAC.prototype.digest = function(enc2, offset = 0) {
        this.outer.update(this.inner.digest());
        return this.outer.digest(enc2, offset);
      };
      Sha512.HMAC = HMAC;
      function noop() {
      }
      function formatInput(input, enc2) {
        var result = b4a.from(input, enc2);
        return [result, result.byteLength];
      }
      function roundUp(n2, base) {
        return n2 + base - 1 & -base;
      }
    }
  });

  // node_modules/sha512-universal/index.js
  var require_sha512_universal = __commonJS({
    "node_modules/sha512-universal/index.js"(exports, module) {
      var js = require_sha512();
      var wasm = require_sha512_wasm();
      var Proto = js;
      module.exports = function() {
        return new Proto();
      };
      module.exports.ready = function(cb) {
        wasm.ready(function() {
          cb();
        });
      };
      module.exports.WASM_SUPPORTED = wasm.SUPPORTED;
      module.exports.WASM_LOADED = false;
      var SHA512_BYTES = module.exports.SHA512_BYTES = 64;
      wasm.ready(function(err) {
        if (!err) {
          module.exports.WASM_LOADED = true;
          module.exports = Proto = wasm;
        }
      });
    }
  });

  // node_modules/sodium-javascript/crypto_auth.js
  var require_crypto_auth = __commonJS({
    "node_modules/sodium-javascript/crypto_auth.js"(exports, module) {
      var { crypto_verify_32 } = require_crypto_verify();
      var Sha512 = require_sha512_universal();
      var assert = require_nanoassert();
      var crypto_auth_BYTES = 32;
      var crypto_auth_KEYBYTES = 32;
      function crypto_auth(out, input, k2) {
        assert(out.byteLength === crypto_auth_BYTES, "out should be 'crypto_auth_BYTES' in length");
        assert(k2.byteLength === crypto_auth_KEYBYTES, "key should be 'crypto_auth_KEYBYTES' in length");
        const out0 = new Uint8Array(64);
        const hmac = Sha512.HMAC(k2);
        hmac.update(input);
        hmac.digest(out0);
        out.set(out0.subarray(0, 32));
      }
      function crypto_auth_verify(h2, input, k2) {
        assert(h2.byteLength === crypto_auth_BYTES, "h should be 'crypto_auth_BYTES' in length");
        assert(k2.byteLength === crypto_auth_KEYBYTES, "key should be 'crypto_auth_KEYBYTES' in length");
        const correct = Sha512.HMAC(k2).update(input).digest();
        return crypto_verify_32(h2, 0, correct, 0);
      }
      module.exports = {
        crypto_auth_BYTES,
        crypto_auth_KEYBYTES,
        crypto_auth,
        crypto_auth_verify
      };
    }
  });

  // node_modules/sodium-javascript/crypto_hash.js
  var require_crypto_hash = __commonJS({
    "node_modules/sodium-javascript/crypto_hash.js"(exports, module) {
      var sha512 = require_sha512_universal();
      var assert = require_nanoassert();
      if (new Uint16Array([1])[0] !== 1) throw new Error("Big endian architecture is not supported.");
      var crypto_hash_sha512_BYTES = 64;
      var crypto_hash_BYTES = crypto_hash_sha512_BYTES;
      function crypto_hash_sha512(out, m2, n2) {
        assert(out.byteLength === crypto_hash_sha512_BYTES, "out must be 'crypto_hash_sha512_BYTES' bytes long");
        sha512().update(m2.subarray(0, n2)).digest(out);
        return 0;
      }
      function crypto_hash(out, m2, n2) {
        return crypto_hash_sha512(out, m2, n2);
      }
      module.exports = {
        crypto_hash,
        crypto_hash_sha512,
        crypto_hash_sha512_BYTES,
        crypto_hash_BYTES
      };
    }
  });

  // node_modules/sodium-javascript/internal/ed25519.js
  var require_ed25519 = __commonJS({
    "node_modules/sodium-javascript/internal/ed25519.js"(exports, module) {
      if (new Uint16Array([1])[0] !== 1) throw new Error("Big endian architecture is not supported.");
      var gf = function(init) {
        var i2, r2 = new Float64Array(16);
        if (init) for (i2 = 0; i2 < init.length; i2++) r2[i2] = init[i2];
        return r2;
      };
      var _0 = new Uint8Array(16);
      var _9 = new Uint8Array(32);
      _9[0] = 9;
      var gf0 = gf();
      var gf1 = gf([1]);
      var _121665 = gf([56129, 1]);
      var D2 = gf([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]);
      var D22 = gf([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]);
      var X2 = gf([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]);
      var Y2 = gf([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]);
      var I2 = gf([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
      function A3(o2, a2, b2) {
        for (var i2 = 0; i2 < 16; i2++) o2[i2] = a2[i2] + b2[i2];
      }
      function Z2(o2, a2, b2) {
        for (var i2 = 0; i2 < 16; i2++) o2[i2] = a2[i2] - b2[i2];
      }
      function M2(o2, a2, b2) {
        var v2, c2, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b2[0], b1 = b2[1], b22 = b2[2], b3 = b2[3], b4 = b2[4], b5 = b2[5], b6 = b2[6], b7 = b2[7], b8 = b2[8], b9 = b2[9], b10 = b2[10], b11 = b2[11], b12 = b2[12], b13 = b2[13], b14 = b2[14], b15 = b2[15];
        v2 = a2[0];
        t0 += v2 * b0;
        t1 += v2 * b1;
        t2 += v2 * b22;
        t3 += v2 * b3;
        t4 += v2 * b4;
        t5 += v2 * b5;
        t6 += v2 * b6;
        t7 += v2 * b7;
        t8 += v2 * b8;
        t9 += v2 * b9;
        t10 += v2 * b10;
        t11 += v2 * b11;
        t12 += v2 * b12;
        t13 += v2 * b13;
        t14 += v2 * b14;
        t15 += v2 * b15;
        v2 = a2[1];
        t1 += v2 * b0;
        t2 += v2 * b1;
        t3 += v2 * b22;
        t4 += v2 * b3;
        t5 += v2 * b4;
        t6 += v2 * b5;
        t7 += v2 * b6;
        t8 += v2 * b7;
        t9 += v2 * b8;
        t10 += v2 * b9;
        t11 += v2 * b10;
        t12 += v2 * b11;
        t13 += v2 * b12;
        t14 += v2 * b13;
        t15 += v2 * b14;
        t16 += v2 * b15;
        v2 = a2[2];
        t2 += v2 * b0;
        t3 += v2 * b1;
        t4 += v2 * b22;
        t5 += v2 * b3;
        t6 += v2 * b4;
        t7 += v2 * b5;
        t8 += v2 * b6;
        t9 += v2 * b7;
        t10 += v2 * b8;
        t11 += v2 * b9;
        t12 += v2 * b10;
        t13 += v2 * b11;
        t14 += v2 * b12;
        t15 += v2 * b13;
        t16 += v2 * b14;
        t17 += v2 * b15;
        v2 = a2[3];
        t3 += v2 * b0;
        t4 += v2 * b1;
        t5 += v2 * b22;
        t6 += v2 * b3;
        t7 += v2 * b4;
        t8 += v2 * b5;
        t9 += v2 * b6;
        t10 += v2 * b7;
        t11 += v2 * b8;
        t12 += v2 * b9;
        t13 += v2 * b10;
        t14 += v2 * b11;
        t15 += v2 * b12;
        t16 += v2 * b13;
        t17 += v2 * b14;
        t18 += v2 * b15;
        v2 = a2[4];
        t4 += v2 * b0;
        t5 += v2 * b1;
        t6 += v2 * b22;
        t7 += v2 * b3;
        t8 += v2 * b4;
        t9 += v2 * b5;
        t10 += v2 * b6;
        t11 += v2 * b7;
        t12 += v2 * b8;
        t13 += v2 * b9;
        t14 += v2 * b10;
        t15 += v2 * b11;
        t16 += v2 * b12;
        t17 += v2 * b13;
        t18 += v2 * b14;
        t19 += v2 * b15;
        v2 = a2[5];
        t5 += v2 * b0;
        t6 += v2 * b1;
        t7 += v2 * b22;
        t8 += v2 * b3;
        t9 += v2 * b4;
        t10 += v2 * b5;
        t11 += v2 * b6;
        t12 += v2 * b7;
        t13 += v2 * b8;
        t14 += v2 * b9;
        t15 += v2 * b10;
        t16 += v2 * b11;
        t17 += v2 * b12;
        t18 += v2 * b13;
        t19 += v2 * b14;
        t20 += v2 * b15;
        v2 = a2[6];
        t6 += v2 * b0;
        t7 += v2 * b1;
        t8 += v2 * b22;
        t9 += v2 * b3;
        t10 += v2 * b4;
        t11 += v2 * b5;
        t12 += v2 * b6;
        t13 += v2 * b7;
        t14 += v2 * b8;
        t15 += v2 * b9;
        t16 += v2 * b10;
        t17 += v2 * b11;
        t18 += v2 * b12;
        t19 += v2 * b13;
        t20 += v2 * b14;
        t21 += v2 * b15;
        v2 = a2[7];
        t7 += v2 * b0;
        t8 += v2 * b1;
        t9 += v2 * b22;
        t10 += v2 * b3;
        t11 += v2 * b4;
        t12 += v2 * b5;
        t13 += v2 * b6;
        t14 += v2 * b7;
        t15 += v2 * b8;
        t16 += v2 * b9;
        t17 += v2 * b10;
        t18 += v2 * b11;
        t19 += v2 * b12;
        t20 += v2 * b13;
        t21 += v2 * b14;
        t22 += v2 * b15;
        v2 = a2[8];
        t8 += v2 * b0;
        t9 += v2 * b1;
        t10 += v2 * b22;
        t11 += v2 * b3;
        t12 += v2 * b4;
        t13 += v2 * b5;
        t14 += v2 * b6;
        t15 += v2 * b7;
        t16 += v2 * b8;
        t17 += v2 * b9;
        t18 += v2 * b10;
        t19 += v2 * b11;
        t20 += v2 * b12;
        t21 += v2 * b13;
        t22 += v2 * b14;
        t23 += v2 * b15;
        v2 = a2[9];
        t9 += v2 * b0;
        t10 += v2 * b1;
        t11 += v2 * b22;
        t12 += v2 * b3;
        t13 += v2 * b4;
        t14 += v2 * b5;
        t15 += v2 * b6;
        t16 += v2 * b7;
        t17 += v2 * b8;
        t18 += v2 * b9;
        t19 += v2 * b10;
        t20 += v2 * b11;
        t21 += v2 * b12;
        t22 += v2 * b13;
        t23 += v2 * b14;
        t24 += v2 * b15;
        v2 = a2[10];
        t10 += v2 * b0;
        t11 += v2 * b1;
        t12 += v2 * b22;
        t13 += v2 * b3;
        t14 += v2 * b4;
        t15 += v2 * b5;
        t16 += v2 * b6;
        t17 += v2 * b7;
        t18 += v2 * b8;
        t19 += v2 * b9;
        t20 += v2 * b10;
        t21 += v2 * b11;
        t22 += v2 * b12;
        t23 += v2 * b13;
        t24 += v2 * b14;
        t25 += v2 * b15;
        v2 = a2[11];
        t11 += v2 * b0;
        t12 += v2 * b1;
        t13 += v2 * b22;
        t14 += v2 * b3;
        t15 += v2 * b4;
        t16 += v2 * b5;
        t17 += v2 * b6;
        t18 += v2 * b7;
        t19 += v2 * b8;
        t20 += v2 * b9;
        t21 += v2 * b10;
        t22 += v2 * b11;
        t23 += v2 * b12;
        t24 += v2 * b13;
        t25 += v2 * b14;
        t26 += v2 * b15;
        v2 = a2[12];
        t12 += v2 * b0;
        t13 += v2 * b1;
        t14 += v2 * b22;
        t15 += v2 * b3;
        t16 += v2 * b4;
        t17 += v2 * b5;
        t18 += v2 * b6;
        t19 += v2 * b7;
        t20 += v2 * b8;
        t21 += v2 * b9;
        t22 += v2 * b10;
        t23 += v2 * b11;
        t24 += v2 * b12;
        t25 += v2 * b13;
        t26 += v2 * b14;
        t27 += v2 * b15;
        v2 = a2[13];
        t13 += v2 * b0;
        t14 += v2 * b1;
        t15 += v2 * b22;
        t16 += v2 * b3;
        t17 += v2 * b4;
        t18 += v2 * b5;
        t19 += v2 * b6;
        t20 += v2 * b7;
        t21 += v2 * b8;
        t22 += v2 * b9;
        t23 += v2 * b10;
        t24 += v2 * b11;
        t25 += v2 * b12;
        t26 += v2 * b13;
        t27 += v2 * b14;
        t28 += v2 * b15;
        v2 = a2[14];
        t14 += v2 * b0;
        t15 += v2 * b1;
        t16 += v2 * b22;
        t17 += v2 * b3;
        t18 += v2 * b4;
        t19 += v2 * b5;
        t20 += v2 * b6;
        t21 += v2 * b7;
        t22 += v2 * b8;
        t23 += v2 * b9;
        t24 += v2 * b10;
        t25 += v2 * b11;
        t26 += v2 * b12;
        t27 += v2 * b13;
        t28 += v2 * b14;
        t29 += v2 * b15;
        v2 = a2[15];
        t15 += v2 * b0;
        t16 += v2 * b1;
        t17 += v2 * b22;
        t18 += v2 * b3;
        t19 += v2 * b4;
        t20 += v2 * b5;
        t21 += v2 * b6;
        t22 += v2 * b7;
        t23 += v2 * b8;
        t24 += v2 * b9;
        t25 += v2 * b10;
        t26 += v2 * b11;
        t27 += v2 * b12;
        t28 += v2 * b13;
        t29 += v2 * b14;
        t30 += v2 * b15;
        t0 += 38 * t16;
        t1 += 38 * t17;
        t2 += 38 * t18;
        t3 += 38 * t19;
        t4 += 38 * t20;
        t5 += 38 * t21;
        t6 += 38 * t22;
        t7 += 38 * t23;
        t8 += 38 * t24;
        t9 += 38 * t25;
        t10 += 38 * t26;
        t11 += 38 * t27;
        t12 += 38 * t28;
        t13 += 38 * t29;
        t14 += 38 * t30;
        c2 = 1;
        v2 = t0 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t0 = v2 - c2 * 65536;
        v2 = t1 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t1 = v2 - c2 * 65536;
        v2 = t2 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t2 = v2 - c2 * 65536;
        v2 = t3 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t3 = v2 - c2 * 65536;
        v2 = t4 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t4 = v2 - c2 * 65536;
        v2 = t5 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t5 = v2 - c2 * 65536;
        v2 = t6 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t6 = v2 - c2 * 65536;
        v2 = t7 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t7 = v2 - c2 * 65536;
        v2 = t8 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t8 = v2 - c2 * 65536;
        v2 = t9 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t9 = v2 - c2 * 65536;
        v2 = t10 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t10 = v2 - c2 * 65536;
        v2 = t11 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t11 = v2 - c2 * 65536;
        v2 = t12 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t12 = v2 - c2 * 65536;
        v2 = t13 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t13 = v2 - c2 * 65536;
        v2 = t14 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t14 = v2 - c2 * 65536;
        v2 = t15 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t15 = v2 - c2 * 65536;
        t0 += c2 - 1 + 37 * (c2 - 1);
        c2 = 1;
        v2 = t0 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t0 = v2 - c2 * 65536;
        v2 = t1 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t1 = v2 - c2 * 65536;
        v2 = t2 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t2 = v2 - c2 * 65536;
        v2 = t3 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t3 = v2 - c2 * 65536;
        v2 = t4 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t4 = v2 - c2 * 65536;
        v2 = t5 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t5 = v2 - c2 * 65536;
        v2 = t6 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t6 = v2 - c2 * 65536;
        v2 = t7 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t7 = v2 - c2 * 65536;
        v2 = t8 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t8 = v2 - c2 * 65536;
        v2 = t9 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t9 = v2 - c2 * 65536;
        v2 = t10 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t10 = v2 - c2 * 65536;
        v2 = t11 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t11 = v2 - c2 * 65536;
        v2 = t12 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t12 = v2 - c2 * 65536;
        v2 = t13 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t13 = v2 - c2 * 65536;
        v2 = t14 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t14 = v2 - c2 * 65536;
        v2 = t15 + c2 + 65535;
        c2 = Math.floor(v2 / 65536);
        t15 = v2 - c2 * 65536;
        t0 += c2 - 1 + 37 * (c2 - 1);
        o2[0] = t0;
        o2[1] = t1;
        o2[2] = t2;
        o2[3] = t3;
        o2[4] = t4;
        o2[5] = t5;
        o2[6] = t6;
        o2[7] = t7;
        o2[8] = t8;
        o2[9] = t9;
        o2[10] = t10;
        o2[11] = t11;
        o2[12] = t12;
        o2[13] = t13;
        o2[14] = t14;
        o2[15] = t15;
      }
      function S2(o2, a2) {
        M2(o2, a2, a2);
      }
      function sel25519(p2, q2, b2) {
        var t2, c2 = ~(b2 - 1);
        for (var i2 = 0; i2 < 16; i2++) {
          t2 = c2 & (p2[i2] ^ q2[i2]);
          p2[i2] ^= t2;
          q2[i2] ^= t2;
        }
      }
      function pack25519(o2, n2) {
        var i2, j2, b2;
        var m2 = gf(), t2 = gf();
        for (i2 = 0; i2 < 16; i2++) t2[i2] = n2[i2];
        car25519(t2);
        car25519(t2);
        car25519(t2);
        for (j2 = 0; j2 < 2; j2++) {
          m2[0] = t2[0] - 65517;
          for (i2 = 1; i2 < 15; i2++) {
            m2[i2] = t2[i2] - 65535 - (m2[i2 - 1] >> 16 & 1);
            m2[i2 - 1] &= 65535;
          }
          m2[15] = t2[15] - 32767 - (m2[14] >> 16 & 1);
          b2 = m2[15] >> 16 & 1;
          m2[14] &= 65535;
          sel25519(t2, m2, 1 - b2);
        }
        for (i2 = 0; i2 < 16; i2++) {
          o2[2 * i2] = t2[i2] & 255;
          o2[2 * i2 + 1] = t2[i2] >> 8;
        }
      }
      function unpack25519(o2, n2) {
        var i2;
        for (i2 = 0; i2 < 16; i2++) o2[i2] = n2[2 * i2] + (n2[2 * i2 + 1] << 8);
        o2[15] &= 32767;
      }
      function inv25519(o2, i2) {
        var c2 = gf();
        var a2;
        for (a2 = 0; a2 < 16; a2++) c2[a2] = i2[a2];
        for (a2 = 253; a2 >= 0; a2--) {
          S2(c2, c2);
          if (a2 !== 2 && a2 !== 4) M2(c2, c2, i2);
        }
        for (a2 = 0; a2 < 16; a2++) o2[a2] = c2[a2];
      }
      function car25519(o2) {
        var i2, v2, c2 = 1;
        for (i2 = 0; i2 < 16; i2++) {
          v2 = o2[i2] + c2 + 65535;
          c2 = Math.floor(v2 / 65536);
          o2[i2] = v2 - c2 * 65536;
        }
        o2[0] += c2 - 1 + 37 * (c2 - 1);
      }
      module.exports = {
        gf,
        A: A3,
        Z: Z2,
        M: M2,
        S: S2,
        sel25519,
        pack25519,
        unpack25519,
        inv25519,
        gf0,
        gf1,
        _9,
        _121665,
        D: D2,
        D2: D22,
        X: X2,
        Y: Y2,
        I: I2
      };
    }
  });

  // node_modules/sodium-javascript/crypto_scalarmult.js
  var require_crypto_scalarmult = __commonJS({
    "node_modules/sodium-javascript/crypto_scalarmult.js"(exports, module) {
      var { _9, _121665, gf, inv25519, pack25519, unpack25519, sel25519, A: A3, M: M2, Z: Z2, S: S2 } = require_ed25519();
      var crypto_scalarmult_BYTES = 32;
      var crypto_scalarmult_SCALARBYTES = 32;
      module.exports = {
        crypto_scalarmult,
        crypto_scalarmult_base,
        crypto_scalarmult_BYTES,
        crypto_scalarmult_SCALARBYTES
      };
      function crypto_scalarmult(q2, n2, p2) {
        check2(q2, crypto_scalarmult_BYTES);
        check2(n2, crypto_scalarmult_SCALARBYTES);
        check2(p2, crypto_scalarmult_BYTES);
        var z2 = new Uint8Array(32);
        var x2 = new Float64Array(80), r2, i2;
        var a2 = gf(), b2 = gf(), c2 = gf(), d2 = gf(), e = gf(), f2 = gf();
        for (i2 = 0; i2 < 31; i2++) z2[i2] = n2[i2];
        z2[31] = n2[31] & 127 | 64;
        z2[0] &= 248;
        unpack25519(x2, p2);
        for (i2 = 0; i2 < 16; i2++) {
          b2[i2] = x2[i2];
          d2[i2] = a2[i2] = c2[i2] = 0;
        }
        a2[0] = d2[0] = 1;
        for (i2 = 254; i2 >= 0; --i2) {
          r2 = z2[i2 >>> 3] >>> (i2 & 7) & 1;
          sel25519(a2, b2, r2);
          sel25519(c2, d2, r2);
          A3(e, a2, c2);
          Z2(a2, a2, c2);
          A3(c2, b2, d2);
          Z2(b2, b2, d2);
          S2(d2, e);
          S2(f2, a2);
          M2(a2, c2, a2);
          M2(c2, b2, e);
          A3(e, a2, c2);
          Z2(a2, a2, c2);
          S2(b2, a2);
          Z2(c2, d2, f2);
          M2(a2, c2, _121665);
          A3(a2, a2, d2);
          M2(c2, c2, a2);
          M2(a2, d2, f2);
          M2(d2, b2, x2);
          S2(b2, e);
          sel25519(a2, b2, r2);
          sel25519(c2, d2, r2);
        }
        for (i2 = 0; i2 < 16; i2++) {
          x2[i2 + 16] = a2[i2];
          x2[i2 + 32] = c2[i2];
          x2[i2 + 48] = b2[i2];
          x2[i2 + 64] = d2[i2];
        }
        var x32 = x2.subarray(32);
        var x16 = x2.subarray(16);
        inv25519(x32, x32);
        M2(x16, x16, x32);
        pack25519(q2, x16);
        return 0;
      }
      function crypto_scalarmult_base(q2, n2) {
        return crypto_scalarmult(q2, n2, _9);
      }
      function check2(buf, len) {
        if (!buf || len && buf.length < len) throw new Error("Argument must be a buffer" + (len ? " of length " + len : ""));
      }
    }
  });

  // node_modules/blake2b-wasm/blake2b.js
  var require_blake2b = __commonJS({
    "node_modules/blake2b-wasm/blake2b.js"(exports, module) {
      var __commonJS2 = (cb, mod) => function __require2() {
        return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
      };
      var __toBinary = /* @__PURE__ */ (() => {
        var table = new Uint8Array(128);
        for (var i2 = 0; i2 < 64; i2++)
          table[i2 < 26 ? i2 + 65 : i2 < 52 ? i2 + 71 : i2 < 62 ? i2 - 4 : i2 * 4 - 205] = i2;
        return (base64) => {
          var n2 = base64.length, bytes2 = new Uint8Array((n2 - (base64[n2 - 1] == "=") - (base64[n2 - 2] == "=")) * 3 / 4 | 0);
          for (var i22 = 0, j2 = 0; i22 < n2; ) {
            var c0 = table[base64.charCodeAt(i22++)], c1 = table[base64.charCodeAt(i22++)];
            var c2 = table[base64.charCodeAt(i22++)], c3 = table[base64.charCodeAt(i22++)];
            bytes2[j2++] = c0 << 2 | c1 >> 4;
            bytes2[j2++] = c1 << 4 | c2 >> 2;
            bytes2[j2++] = c2 << 6 | c3;
          }
          return bytes2;
        };
      })();
      var require_blake2b3 = __commonJS2({
        "wasm-binary:./blake2b.wat"(exports2, module2) {
          module2.exports = __toBinary("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");
        }
      });
      var bytes = require_blake2b3();
      var compiled = WebAssembly.compile(bytes);
      module.exports = async (imports) => {
        const instance = await WebAssembly.instantiate(await compiled, imports);
        return instance.exports;
      };
    }
  });

  // node_modules/blake2b-wasm/index.js
  var require_blake2b_wasm = __commonJS({
    "node_modules/blake2b-wasm/index.js"(exports, module) {
      var assert = require_nanoassert();
      var b4a = require_browser();
      var wasm = null;
      var wasmPromise = typeof WebAssembly !== "undefined" && require_blake2b()().then((mod) => {
        wasm = mod;
      });
      var head = 64;
      var freeList = [];
      module.exports = Blake2b;
      var BYTES_MIN = module.exports.BYTES_MIN = 16;
      var BYTES_MAX = module.exports.BYTES_MAX = 64;
      var BYTES = module.exports.BYTES = 32;
      var KEYBYTES_MIN = module.exports.KEYBYTES_MIN = 16;
      var KEYBYTES_MAX = module.exports.KEYBYTES_MAX = 64;
      var KEYBYTES = module.exports.KEYBYTES = 32;
      var SALTBYTES = module.exports.SALTBYTES = 16;
      var PERSONALBYTES = module.exports.PERSONALBYTES = 16;
      function Blake2b(digestLength, key, salt, personal, noAssert) {
        if (!(this instanceof Blake2b)) return new Blake2b(digestLength, key, salt, personal, noAssert);
        if (!wasm) throw new Error("WASM not loaded. Wait for Blake2b.ready(cb)");
        if (!digestLength) digestLength = 32;
        if (noAssert !== true) {
          assert(digestLength >= BYTES_MIN, "digestLength must be at least " + BYTES_MIN + ", was given " + digestLength);
          assert(digestLength <= BYTES_MAX, "digestLength must be at most " + BYTES_MAX + ", was given " + digestLength);
          if (key != null) {
            assert(key instanceof Uint8Array, "key must be Uint8Array or Buffer");
            assert(key.length >= KEYBYTES_MIN, "key must be at least " + KEYBYTES_MIN + ", was given " + key.length);
            assert(key.length <= KEYBYTES_MAX, "key must be at least " + KEYBYTES_MAX + ", was given " + key.length);
          }
          if (salt != null) {
            assert(salt instanceof Uint8Array, "salt must be Uint8Array or Buffer");
            assert(salt.length === SALTBYTES, "salt must be exactly " + SALTBYTES + ", was given " + salt.length);
          }
          if (personal != null) {
            assert(personal instanceof Uint8Array, "personal must be Uint8Array or Buffer");
            assert(personal.length === PERSONALBYTES, "personal must be exactly " + PERSONALBYTES + ", was given " + personal.length);
          }
        }
        if (!freeList.length) {
          freeList.push(head);
          head += 216;
        }
        this.digestLength = digestLength;
        this.finalized = false;
        this.pointer = freeList.pop();
        this._memory = new Uint8Array(wasm.memory.buffer);
        this._memory.fill(0, 0, 64);
        this._memory[0] = this.digestLength;
        this._memory[1] = key ? key.length : 0;
        this._memory[2] = 1;
        this._memory[3] = 1;
        if (salt) this._memory.set(salt, 32);
        if (personal) this._memory.set(personal, 48);
        if (this.pointer + 216 > this._memory.length) this._realloc(this.pointer + 216);
        wasm.blake2b_init(this.pointer, this.digestLength);
        if (key) {
          this.update(key);
          this._memory.fill(0, head, head + key.length);
          this._memory[this.pointer + 200] = 128;
        }
      }
      Blake2b.prototype._realloc = function(size) {
        wasm.memory.grow(Math.max(0, Math.ceil(Math.abs(size - this._memory.length) / 65536)));
        this._memory = new Uint8Array(wasm.memory.buffer);
      };
      Blake2b.prototype.update = function(input) {
        assert(this.finalized === false, "Hash instance finalized");
        assert(input instanceof Uint8Array, "input must be Uint8Array or Buffer");
        if (head + input.length > this._memory.length) this._realloc(head + input.length);
        this._memory.set(input, head);
        wasm.blake2b_update(this.pointer, head, head + input.length);
        return this;
      };
      Blake2b.prototype.digest = function(enc2) {
        assert(this.finalized === false, "Hash instance finalized");
        this.finalized = true;
        freeList.push(this.pointer);
        wasm.blake2b_final(this.pointer);
        if (!enc2 || enc2 === "binary") {
          return this._memory.slice(this.pointer + 128, this.pointer + 128 + this.digestLength);
        }
        if (typeof enc2 === "string") {
          return b4a.toString(this._memory, enc2, this.pointer + 128, this.pointer + 128 + this.digestLength);
        }
        assert(enc2 instanceof Uint8Array && enc2.length >= this.digestLength, "input must be Uint8Array or Buffer");
        for (var i2 = 0; i2 < this.digestLength; i2++) {
          enc2[i2] = this._memory[this.pointer + 128 + i2];
        }
        return enc2;
      };
      Blake2b.prototype.final = Blake2b.prototype.digest;
      Blake2b.WASM = wasm;
      Blake2b.SUPPORTED = typeof WebAssembly !== "undefined";
      Blake2b.ready = function(cb) {
        if (!cb) cb = noop;
        if (!wasmPromise) return cb(new Error("WebAssembly not supported"));
        return wasmPromise.then(() => cb(), cb);
      };
      Blake2b.prototype.ready = Blake2b.ready;
      Blake2b.prototype.getPartialHash = function() {
        return this._memory.slice(this.pointer, this.pointer + 216);
      };
      Blake2b.prototype.setPartialHash = function(ph) {
        this._memory.set(ph, this.pointer);
      };
      function noop() {
      }
    }
  });

  // node_modules/blake2b/index.js
  var require_blake2b2 = __commonJS({
    "node_modules/blake2b/index.js"(exports, module) {
      var assert = require_nanoassert();
      var b2wasm = require_blake2b_wasm();
      function ADD64AA(v3, a2, b2) {
        var o0 = v3[a2] + v3[b2];
        var o1 = v3[a2 + 1] + v3[b2 + 1];
        if (o0 >= 4294967296) {
          o1++;
        }
        v3[a2] = o0;
        v3[a2 + 1] = o1;
      }
      function ADD64AC(v3, a2, b0, b1) {
        var o0 = v3[a2] + b0;
        if (b0 < 0) {
          o0 += 4294967296;
        }
        var o1 = v3[a2 + 1] + b1;
        if (o0 >= 4294967296) {
          o1++;
        }
        v3[a2] = o0;
        v3[a2 + 1] = o1;
      }
      function B2B_GET32(arr, i2) {
        return arr[i2] ^ arr[i2 + 1] << 8 ^ arr[i2 + 2] << 16 ^ arr[i2 + 3] << 24;
      }
      function B2B_G(a2, b2, c2, d2, ix, iy) {
        var x0 = m2[ix];
        var x1 = m2[ix + 1];
        var y0 = m2[iy];
        var y1 = m2[iy + 1];
        ADD64AA(v2, a2, b2);
        ADD64AC(v2, a2, x0, x1);
        var xor0 = v2[d2] ^ v2[a2];
        var xor1 = v2[d2 + 1] ^ v2[a2 + 1];
        v2[d2] = xor1;
        v2[d2 + 1] = xor0;
        ADD64AA(v2, c2, d2);
        xor0 = v2[b2] ^ v2[c2];
        xor1 = v2[b2 + 1] ^ v2[c2 + 1];
        v2[b2] = xor0 >>> 24 ^ xor1 << 8;
        v2[b2 + 1] = xor1 >>> 24 ^ xor0 << 8;
        ADD64AA(v2, a2, b2);
        ADD64AC(v2, a2, y0, y1);
        xor0 = v2[d2] ^ v2[a2];
        xor1 = v2[d2 + 1] ^ v2[a2 + 1];
        v2[d2] = xor0 >>> 16 ^ xor1 << 16;
        v2[d2 + 1] = xor1 >>> 16 ^ xor0 << 16;
        ADD64AA(v2, c2, d2);
        xor0 = v2[b2] ^ v2[c2];
        xor1 = v2[b2 + 1] ^ v2[c2 + 1];
        v2[b2] = xor1 >>> 31 ^ xor0 << 1;
        v2[b2 + 1] = xor0 >>> 31 ^ xor1 << 1;
      }
      var BLAKE2B_IV32 = new Uint32Array([
        4089235720,
        1779033703,
        2227873595,
        3144134277,
        4271175723,
        1013904242,
        1595750129,
        2773480762,
        2917565137,
        1359893119,
        725511199,
        2600822924,
        4215389547,
        528734635,
        327033209,
        1541459225
      ]);
      var SIGMA8 = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        14,
        10,
        4,
        8,
        9,
        15,
        13,
        6,
        1,
        12,
        0,
        2,
        11,
        7,
        5,
        3,
        11,
        8,
        12,
        0,
        5,
        2,
        15,
        13,
        10,
        14,
        3,
        6,
        7,
        1,
        9,
        4,
        7,
        9,
        3,
        1,
        13,
        12,
        11,
        14,
        2,
        6,
        5,
        10,
        4,
        0,
        15,
        8,
        9,
        0,
        5,
        7,
        2,
        4,
        10,
        15,
        14,
        1,
        11,
        12,
        6,
        8,
        3,
        13,
        2,
        12,
        6,
        10,
        0,
        11,
        8,
        3,
        4,
        13,
        7,
        5,
        15,
        14,
        1,
        9,
        12,
        5,
        1,
        15,
        14,
        13,
        4,
        10,
        0,
        7,
        6,
        3,
        9,
        2,
        8,
        11,
        13,
        11,
        7,
        14,
        12,
        1,
        3,
        9,
        5,
        0,
        15,
        4,
        8,
        6,
        2,
        10,
        6,
        15,
        14,
        9,
        11,
        3,
        0,
        8,
        12,
        2,
        13,
        7,
        1,
        4,
        10,
        5,
        10,
        2,
        8,
        4,
        7,
        6,
        1,
        5,
        15,
        11,
        9,
        14,
        3,
        12,
        13,
        0,
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        14,
        10,
        4,
        8,
        9,
        15,
        13,
        6,
        1,
        12,
        0,
        2,
        11,
        7,
        5,
        3
      ];
      var SIGMA82 = new Uint8Array(SIGMA8.map(function(x2) {
        return x2 * 2;
      }));
      var v2 = new Uint32Array(32);
      var m2 = new Uint32Array(32);
      function blake2bCompress(ctx, last) {
        var i2 = 0;
        for (i2 = 0; i2 < 16; i2++) {
          v2[i2] = ctx.h[i2];
          v2[i2 + 16] = BLAKE2B_IV32[i2];
        }
        v2[24] = v2[24] ^ ctx.t;
        v2[25] = v2[25] ^ ctx.t / 4294967296;
        if (last) {
          v2[28] = ~v2[28];
          v2[29] = ~v2[29];
        }
        for (i2 = 0; i2 < 32; i2++) {
          m2[i2] = B2B_GET32(ctx.b, 4 * i2);
        }
        for (i2 = 0; i2 < 12; i2++) {
          B2B_G(0, 8, 16, 24, SIGMA82[i2 * 16 + 0], SIGMA82[i2 * 16 + 1]);
          B2B_G(2, 10, 18, 26, SIGMA82[i2 * 16 + 2], SIGMA82[i2 * 16 + 3]);
          B2B_G(4, 12, 20, 28, SIGMA82[i2 * 16 + 4], SIGMA82[i2 * 16 + 5]);
          B2B_G(6, 14, 22, 30, SIGMA82[i2 * 16 + 6], SIGMA82[i2 * 16 + 7]);
          B2B_G(0, 10, 20, 30, SIGMA82[i2 * 16 + 8], SIGMA82[i2 * 16 + 9]);
          B2B_G(2, 12, 22, 24, SIGMA82[i2 * 16 + 10], SIGMA82[i2 * 16 + 11]);
          B2B_G(4, 14, 16, 26, SIGMA82[i2 * 16 + 12], SIGMA82[i2 * 16 + 13]);
          B2B_G(6, 8, 18, 28, SIGMA82[i2 * 16 + 14], SIGMA82[i2 * 16 + 15]);
        }
        for (i2 = 0; i2 < 16; i2++) {
          ctx.h[i2] = ctx.h[i2] ^ v2[i2] ^ v2[i2 + 16];
        }
      }
      var parameter_block = new Uint8Array([
        0,
        0,
        0,
        0,
        //  0: outlen, keylen, fanout, depth
        0,
        0,
        0,
        0,
        //  4: leaf length, sequential mode
        0,
        0,
        0,
        0,
        //  8: node offset
        0,
        0,
        0,
        0,
        // 12: node offset
        0,
        0,
        0,
        0,
        // 16: node depth, inner length, rfu
        0,
        0,
        0,
        0,
        // 20: rfu
        0,
        0,
        0,
        0,
        // 24: rfu
        0,
        0,
        0,
        0,
        // 28: rfu
        0,
        0,
        0,
        0,
        // 32: salt
        0,
        0,
        0,
        0,
        // 36: salt
        0,
        0,
        0,
        0,
        // 40: salt
        0,
        0,
        0,
        0,
        // 44: salt
        0,
        0,
        0,
        0,
        // 48: personal
        0,
        0,
        0,
        0,
        // 52: personal
        0,
        0,
        0,
        0,
        // 56: personal
        0,
        0,
        0,
        0
        // 60: personal
      ]);
      function Blake2b(outlen, key, salt, personal) {
        parameter_block.fill(0);
        this.b = new Uint8Array(128);
        this.h = new Uint32Array(16);
        this.t = 0;
        this.c = 0;
        this.outlen = outlen;
        parameter_block[0] = outlen;
        if (key) parameter_block[1] = key.length;
        parameter_block[2] = 1;
        parameter_block[3] = 1;
        if (salt) parameter_block.set(salt, 32);
        if (personal) parameter_block.set(personal, 48);
        for (var i2 = 0; i2 < 16; i2++) {
          this.h[i2] = BLAKE2B_IV32[i2] ^ B2B_GET32(parameter_block, i2 * 4);
        }
        if (key) {
          blake2bUpdate(this, key);
          this.c = 128;
        }
      }
      Blake2b.prototype.update = function(input) {
        assert(input instanceof Uint8Array, "input must be Uint8Array or Buffer");
        blake2bUpdate(this, input);
        return this;
      };
      Blake2b.prototype.digest = function(out) {
        var buf = !out || out === "binary" || out === "hex" ? new Uint8Array(this.outlen) : out;
        assert(buf instanceof Uint8Array, 'out must be "binary", "hex", Uint8Array, or Buffer');
        assert(buf.length >= this.outlen, "out must have at least outlen bytes of space");
        blake2bFinal(this, buf);
        if (out === "hex") return hexSlice(buf);
        return buf;
      };
      Blake2b.prototype.final = Blake2b.prototype.digest;
      Blake2b.ready = function(cb) {
        b2wasm.ready(function() {
          cb();
        });
      };
      function blake2bUpdate(ctx, input) {
        for (var i2 = 0; i2 < input.length; i2++) {
          if (ctx.c === 128) {
            ctx.t += ctx.c;
            blake2bCompress(ctx, false);
            ctx.c = 0;
          }
          ctx.b[ctx.c++] = input[i2];
        }
      }
      function blake2bFinal(ctx, out) {
        ctx.t += ctx.c;
        while (ctx.c < 128) {
          ctx.b[ctx.c++] = 0;
        }
        blake2bCompress(ctx, true);
        for (var i2 = 0; i2 < ctx.outlen; i2++) {
          out[i2] = ctx.h[i2 >> 2] >> 8 * (i2 & 3);
        }
        return out;
      }
      function hexSlice(buf) {
        var str = "";
        for (var i2 = 0; i2 < buf.length; i2++) str += toHex2(buf[i2]);
        return str;
      }
      function toHex2(n2) {
        if (n2 < 16) return "0" + n2.toString(16);
        return n2.toString(16);
      }
      var Proto = Blake2b;
      module.exports = function createHash(outlen, key, salt, personal, noAssert) {
        if (noAssert !== true) {
          assert(outlen >= BYTES_MIN, "outlen must be at least " + BYTES_MIN + ", was given " + outlen);
          assert(outlen <= BYTES_MAX, "outlen must be at most " + BYTES_MAX + ", was given " + outlen);
          if (key != null) {
            assert(key instanceof Uint8Array, "key must be Uint8Array or Buffer");
            assert(key.length >= KEYBYTES_MIN, "key must be at least " + KEYBYTES_MIN + ", was given " + key.length);
            assert(key.length <= KEYBYTES_MAX, "key must be at most " + KEYBYTES_MAX + ", was given " + key.length);
          }
          if (salt != null) {
            assert(salt instanceof Uint8Array, "salt must be Uint8Array or Buffer");
            assert(salt.length === SALTBYTES, "salt must be exactly " + SALTBYTES + ", was given " + salt.length);
          }
          if (personal != null) {
            assert(personal instanceof Uint8Array, "personal must be Uint8Array or Buffer");
            assert(personal.length === PERSONALBYTES, "personal must be exactly " + PERSONALBYTES + ", was given " + personal.length);
          }
        }
        return new Proto(outlen, key, salt, personal);
      };
      module.exports.ready = function(cb) {
        b2wasm.ready(function() {
          cb();
        });
      };
      module.exports.WASM_SUPPORTED = b2wasm.SUPPORTED;
      module.exports.WASM_LOADED = false;
      var BYTES_MIN = module.exports.BYTES_MIN = 16;
      var BYTES_MAX = module.exports.BYTES_MAX = 64;
      var BYTES = module.exports.BYTES = 32;
      var KEYBYTES_MIN = module.exports.KEYBYTES_MIN = 16;
      var KEYBYTES_MAX = module.exports.KEYBYTES_MAX = 64;
      var KEYBYTES = module.exports.KEYBYTES = 32;
      var SALTBYTES = module.exports.SALTBYTES = 16;
      var PERSONALBYTES = module.exports.PERSONALBYTES = 16;
      b2wasm.ready(function(err) {
        if (!err) {
          module.exports.WASM_LOADED = true;
          module.exports = b2wasm;
        }
      });
    }
  });

  // node_modules/sodium-javascript/crypto_generichash.js
  var require_crypto_generichash = __commonJS({
    "node_modules/sodium-javascript/crypto_generichash.js"(exports, module) {
      var blake2b = require_blake2b2();
      if (new Uint16Array([1])[0] !== 1) throw new Error("Big endian architecture is not supported.");
      module.exports.crypto_generichash_PRIMITIVE = "blake2b";
      module.exports.crypto_generichash_BYTES_MIN = blake2b.BYTES_MIN;
      module.exports.crypto_generichash_BYTES_MAX = blake2b.BYTES_MAX;
      module.exports.crypto_generichash_BYTES = blake2b.BYTES;
      module.exports.crypto_generichash_KEYBYTES_MIN = blake2b.KEYBYTES_MIN;
      module.exports.crypto_generichash_KEYBYTES_MAX = blake2b.KEYBYTES_MAX;
      module.exports.crypto_generichash_KEYBYTES = blake2b.KEYBYTES;
      module.exports.crypto_generichash_WASM_SUPPORTED = blake2b.WASM_SUPPORTED;
      module.exports.crypto_generichash_WASM_LOADED = false;
      module.exports.crypto_generichash = function(output, input, key) {
        blake2b(output.length, key).update(input).final(output);
      };
      module.exports.crypto_generichash_ready = blake2b.ready;
      module.exports.crypto_generichash_batch = function(output, inputArray, key) {
        var ctx = blake2b(output.length, key);
        for (var i2 = 0; i2 < inputArray.length; i2++) {
          ctx.update(inputArray[i2]);
        }
        ctx.final(output);
      };
      module.exports.crypto_generichash_instance = function(key, outlen) {
        if (outlen == null) outlen = module.exports.crypto_generichash_BYTES;
        return blake2b(outlen, key);
      };
      blake2b.ready(function(_2) {
        module.exports.crypto_generichash_WASM_LOADED = blake2b.WASM_LOADED;
      });
    }
  });

  // node_modules/xsalsa20/xsalsa20.js
  var require_xsalsa20 = __commonJS({
    "node_modules/xsalsa20/xsalsa20.js"(exports, module) {
      var __commonJS2 = (cb, mod) => function __require2() {
        return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
      };
      var __toBinary = /* @__PURE__ */ (() => {
        var table = new Uint8Array(128);
        for (var i2 = 0; i2 < 64; i2++)
          table[i2 < 26 ? i2 + 65 : i2 < 52 ? i2 + 71 : i2 < 62 ? i2 - 4 : i2 * 4 - 205] = i2;
        return (base64) => {
          var n2 = base64.length, bytes2 = new Uint8Array((n2 - (base64[n2 - 1] == "=") - (base64[n2 - 2] == "=")) * 3 / 4 | 0);
          for (var i22 = 0, j2 = 0; i22 < n2; ) {
            var c0 = table[base64.charCodeAt(i22++)], c1 = table[base64.charCodeAt(i22++)];
            var c2 = table[base64.charCodeAt(i22++)], c3 = table[base64.charCodeAt(i22++)];
            bytes2[j2++] = c0 << 2 | c1 >> 4;
            bytes2[j2++] = c1 << 4 | c2 >> 2;
            bytes2[j2++] = c2 << 6 | c3;
          }
          return bytes2;
        };
      })();
      var require_xsalsa203 = __commonJS2({
        "wasm-binary:./xsalsa20.wat"(exports2, module2) {
          module2.exports = __toBinary("AGFzbQEAAAABGgNgBn9/f39/fwBgBn9/f39+fwF+YAN/f38AAwcGAAEBAgICBQUBAQroBwcoAwZtZW1vcnkCAAx4c2Fsc2EyMF94b3IAAAxjb3JlX3NhbHNhMjAABArqEQYYACAAIAEgAiADIAQgACkDACAFEAE3AwALPQBB8AAgAyAFEAMgACABIAIgA0EQaiAEQfAAEAJB8ABCADcDAEH4AEIANwMAQYABQgA3AwBBiAFCADcDAAuHBQEBfyACQQBGBEBCAA8LQdAAIAUpAwA3AwBB2AAgBUEIaikDADcDAEHgACAFQRBqKQMANwMAQegAIAVBGGopAwA3AwBBACADKQMANwMAQQggBDcDAAJAA0AgAkHAAEkNAUEQQQBB0AAQBSAAIAEpAwBBECkDAIU3AwAgAEEIaiABQQhqKQMAQRgpAwCFNwMAIABBEGogAUEQaikDAEEgKQMAhTcDACAAQRhqIAFBGGopAwBBKCkDAIU3AwAgAEEgaiABQSBqKQMAQTApAwCFNwMAIABBKGogAUEoaikDAEE4KQMAhTcDACAAQTBqIAFBMGopAwBBwAApAwCFNwMAIABBOGogAUE4aikDAEHIACkDAIU3AwBBCEEIKQMAQgF8NwMAIABBwABqIQAgAUHAAGohASACQcAAayECDAALC0EIKQMAIQQgAkEASwRAQRBBAEHQABAFAkACQAJAAkACQAJAAkACQCACQQhuDgcHBgUEAwIBAAsgAEE4aiABQThqKQMAQcgAKQMAhTcDAAsgAEEwaiABQTBqKQMAQcAAKQMAhTcDAAsgAEEoaiABQShqKQMAQTgpAwCFNwMACyAAQSBqIAFBIGopAwBBMCkDAIU3AwALIABBGGogAUEYaikDAEEoKQMAhTcDAAsgAEEQaiABQRBqKQMAQSApAwCFNwMACyAAQQhqIAFBCGopAwBBGCkDAIU3AwALIAAgASkDAEEQKQMAhTcDAAtBEEIANwMAQRhCADcDAEEgQgA3AwBBKEIANwMAQTBCADcDAEE4QgA3AwBBwABCADcDAEHIAEIANwMAQdAAQgA3AwBB2ABCADcDAEHgAEIANwMAQegAQgA3AwAgBA8LnQUBEX9B5fDBiwYhA0HuyIGZAyEIQbLaiMsHIQ1B9MqB2QYhEiACKAIAIQQgAkEEaigCACEFIAJBCGooAgAhBiACQQxqKAIAIQcgAkEQaigCACEOIAJBFGooAgAhDyACQRhqKAIAIRAgAkEcaigCACERIAEoAgAhCSABQQRqKAIAIQogAUEIaigCACELIAFBDGooAgAhDEEUIRMCQANAIBNBAEYNASAHIAMgD2pBB3dzIQcgCyAHIANqQQl3cyELIA8gCyAHakENd3MhDyADIA8gC2pBEndzIQMgDCAIIARqQQd3cyEMIBAgDCAIakEJd3MhECAEIBAgDGpBDXdzIQQgCCAEIBBqQRJ3cyEIIBEgDSAJakEHd3MhESAFIBEgDWpBCXdzIQUgCSAFIBFqQQ13cyEJIA0gCSAFakESd3MhDSAGIBIgDmpBB3dzIQYgCiAGIBJqQQl3cyEKIA4gCiAGakENd3MhDiASIA4gCmpBEndzIRIgBCADIAZqQQd3cyEEIAUgBCADakEJd3MhBSAGIAUgBGpBDXdzIQYgAyAGIAVqQRJ3cyEDIAkgCCAHakEHd3MhCSAKIAkgCGpBCXdzIQogByAKIAlqQQ13cyEHIAggByAKakESd3MhCCAOIA0gDGpBB3dzIQ4gCyAOIA1qQQl3cyELIAwgCyAOakENd3MhDCANIAwgC2pBEndzIQ0gDyASIBFqQQd3cyEPIBAgDyASakEJd3MhECARIBAgD2pBDXdzIREgEiARIBBqQRJ3cyESIBNBAmshEwwACwsgACADNgIAIABBBGogCDYCACAAQQhqIA02AgAgAEEMaiASNgIAIABBEGogCTYCACAAQRRqIAo2AgAgAEEYaiALNgIAIABBHGogDDYCAAsKACAAIAEgAhAFC90GASF/QeXwwYsGIQNB7siBmQMhCEGy2ojLByENQfTKgdkGIRIgAigCACEEIAJBBGooAgAhBSACQQhqKAIAIQYgAkEMaigCACEHIAJBEGooAgAhDiACQRRqKAIAIQ8gAkEYaigCACEQIAJBHGooAgAhESABKAIAIQkgAUEEaigCACEKIAFBCGooAgAhCyABQQxqKAIAIQwgAyETIAQhFCAFIRUgBiEWIAchFyAIIRggCSEZIAohGiALIRsgDCEcIA0hHSAOIR4gDyEfIBAhICARISEgEiEiQRQhIwJAA0AgI0EARg0BIAcgAyAPakEHd3MhByALIAcgA2pBCXdzIQsgDyALIAdqQQ13cyEPIAMgDyALakESd3MhAyAMIAggBGpBB3dzIQwgECAMIAhqQQl3cyEQIAQgECAMakENd3MhBCAIIAQgEGpBEndzIQggESANIAlqQQd3cyERIAUgESANakEJd3MhBSAJIAUgEWpBDXdzIQkgDSAJIAVqQRJ3cyENIAYgEiAOakEHd3MhBiAKIAYgEmpBCXdzIQogDiAKIAZqQQ13cyEOIBIgDiAKakESd3MhEiAEIAMgBmpBB3dzIQQgBSAEIANqQQl3cyEFIAYgBSAEakENd3MhBiADIAYgBWpBEndzIQMgCSAIIAdqQQd3cyEJIAogCSAIakEJd3MhCiAHIAogCWpBDXdzIQcgCCAHIApqQRJ3cyEIIA4gDSAMakEHd3MhDiALIA4gDWpBCXdzIQsgDCALIA5qQQ13cyEMIA0gDCALakESd3MhDSAPIBIgEWpBB3dzIQ8gECAPIBJqQQl3cyEQIBEgECAPakENd3MhESASIBEgEGpBEndzIRIgI0ECayEjDAALCyAAIAMgE2o2AgAgAEEEaiAEIBRqNgIAIABBCGogBSAVajYCACAAQQxqIAYgFmo2AgAgAEEQaiAHIBdqNgIAIABBFGogCCAYajYCACAAQRhqIAkgGWo2AgAgAEEcaiAKIBpqNgIAIABBIGogCyAbajYCACAAQSRqIAwgHGo2AgAgAEEoaiANIB1qNgIAIABBLGogDiAeajYCACAAQTBqIA8gH2o2AgAgAEE0aiAQICBqNgIAIABBOGogESAhajYCACAAQTxqIBIgImo2AgAL");
        }
      });
      var bytes = require_xsalsa203();
      var compiled = new WebAssembly.Module(bytes);
      module.exports = (imports) => {
        const instance = new WebAssembly.Instance(compiled, imports);
        return instance.exports;
      };
    }
  });

  // node_modules/xsalsa20/index.js
  var require_xsalsa202 = __commonJS({
    "node_modules/xsalsa20/index.js"(exports, module) {
      var xsalsa20 = typeof WebAssembly !== "undefined" && require_xsalsa20()();
      var SIGMA = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
      var head = 144;
      var top = head;
      var free = [];
      module.exports = XSalsa20;
      XSalsa20.NONCEBYTES = 24;
      XSalsa20.KEYBYTES = 32;
      XSalsa20.core_hsalsa20 = core_hsalsa20;
      XSalsa20.SIGMA = SIGMA;
      function XSalsa20(nonce, key) {
        if (!(this instanceof XSalsa20)) return new XSalsa20(nonce, key);
        if (!nonce || nonce.length < 24) throw new Error("nonce must be at least 24 bytes");
        if (!key || key.length < 32) throw new Error("key must be at least 32 bytes");
        this._xor = xsalsa20 ? new WASM(nonce, key) : new Fallback(nonce, key);
      }
      XSalsa20.prototype.update = function(input, output) {
        if (!input) throw new Error("input must be Uint8Array or Buffer");
        if (!output) output = new Uint8Array(input.length);
        if (input.length) this._xor.update(input, output);
        return output;
      };
      XSalsa20.prototype.final = XSalsa20.prototype.finalize = function() {
        this._xor.finalize();
        this._xor = null;
      };
      function WASM(nonce, key) {
        if (!free.length) {
          free.push(head);
          head += 64;
        }
        this._pointer = free.pop();
        this._nonce = this._pointer + 8;
        this._key = this._nonce + 24;
        this._overflow = 0;
        this._memory = new Uint8Array(xsalsa20.memory.buffer);
        this._memory.fill(0, this._pointer, this._pointer + 8);
        this._memory.set(nonce, this._nonce);
        this._memory.set(key, this._key);
      }
      WASM.prototype.realloc = function(size) {
        xsalsa20.memory.grow(Math.ceil(Math.abs(size - this._memory.length) / 65536));
        this._memory = new Uint8Array(xsalsa20.memory.buffer);
      };
      WASM.prototype.update = function(input, output) {
        var len = this._overflow + input.length;
        var start = head + this._overflow;
        top = head + len;
        if (top >= this._memory.length) this.realloc(top);
        this._memory.set(input, start);
        xsalsa20.xsalsa20_xor(this._pointer, head, head, len, this._nonce, this._key);
        output.set(this._memory.subarray(start, head + len));
        this._overflow = len & 63;
      };
      WASM.prototype.finalize = function() {
        this._memory.fill(0, this._pointer, this._key + 32);
        if (top > head) {
          this._memory.fill(0, head, top);
          top = 0;
        }
        free.push(this._pointer);
      };
      function Fallback(nonce, key) {
        this._s = new Uint8Array(32);
        this._z = new Uint8Array(16);
        this._overflow = 0;
        core_hsalsa20(this._s, nonce, key, SIGMA);
        for (var i2 = 0; i2 < 8; i2++) this._z[i2] = nonce[i2 + 16];
      }
      Fallback.prototype.update = function(input, output) {
        var x2 = new Uint8Array(64);
        var u2 = 0;
        var i2 = this._overflow;
        var b2 = input.length + this._overflow;
        var z2 = this._z;
        var mpos = -this._overflow;
        var cpos = -this._overflow;
        while (b2 >= 64) {
          core_salsa20(x2, z2, this._s, SIGMA);
          for (; i2 < 64; i2++) output[cpos + i2] = input[mpos + i2] ^ x2[i2];
          u2 = 1;
          for (i2 = 8; i2 < 16; i2++) {
            u2 += z2[i2] & 255 | 0;
            z2[i2] = u2 & 255;
            u2 >>>= 8;
          }
          b2 -= 64;
          cpos += 64;
          mpos += 64;
          i2 = 0;
        }
        if (b2 > 0) {
          core_salsa20(x2, z2, this._s, SIGMA);
          for (; i2 < b2; i2++) output[cpos + i2] = input[mpos + i2] ^ x2[i2];
        }
        this._overflow = b2 & 63;
      };
      Fallback.prototype.finalize = function() {
        this._s.fill(0);
        this._z.fill(0);
      };
      function core_salsa20(o2, p2, k2, c2) {
        var j0 = c2[0] & 255 | (c2[1] & 255) << 8 | (c2[2] & 255) << 16 | (c2[3] & 255) << 24, j1 = k2[0] & 255 | (k2[1] & 255) << 8 | (k2[2] & 255) << 16 | (k2[3] & 255) << 24, j2 = k2[4] & 255 | (k2[5] & 255) << 8 | (k2[6] & 255) << 16 | (k2[7] & 255) << 24, j3 = k2[8] & 255 | (k2[9] & 255) << 8 | (k2[10] & 255) << 16 | (k2[11] & 255) << 24, j4 = k2[12] & 255 | (k2[13] & 255) << 8 | (k2[14] & 255) << 16 | (k2[15] & 255) << 24, j5 = c2[4] & 255 | (c2[5] & 255) << 8 | (c2[6] & 255) << 16 | (c2[7] & 255) << 24, j6 = p2[0] & 255 | (p2[1] & 255) << 8 | (p2[2] & 255) << 16 | (p2[3] & 255) << 24, j7 = p2[4] & 255 | (p2[5] & 255) << 8 | (p2[6] & 255) << 16 | (p2[7] & 255) << 24, j8 = p2[8] & 255 | (p2[9] & 255) << 8 | (p2[10] & 255) << 16 | (p2[11] & 255) << 24, j9 = p2[12] & 255 | (p2[13] & 255) << 8 | (p2[14] & 255) << 16 | (p2[15] & 255) << 24, j10 = c2[8] & 255 | (c2[9] & 255) << 8 | (c2[10] & 255) << 16 | (c2[11] & 255) << 24, j11 = k2[16] & 255 | (k2[17] & 255) << 8 | (k2[18] & 255) << 16 | (k2[19] & 255) << 24, j12 = k2[20] & 255 | (k2[21] & 255) << 8 | (k2[22] & 255) << 16 | (k2[23] & 255) << 24, j13 = k2[24] & 255 | (k2[25] & 255) << 8 | (k2[26] & 255) << 16 | (k2[27] & 255) << 24, j14 = k2[28] & 255 | (k2[29] & 255) << 8 | (k2[30] & 255) << 16 | (k2[31] & 255) << 24, j15 = c2[12] & 255 | (c2[13] & 255) << 8 | (c2[14] & 255) << 16 | (c2[15] & 255) << 24;
        var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, u2;
        for (var i2 = 0; i2 < 20; i2 += 2) {
          u2 = x0 + x12 | 0;
          x4 ^= u2 << 7 | u2 >>> 25;
          u2 = x4 + x0 | 0;
          x8 ^= u2 << 9 | u2 >>> 23;
          u2 = x8 + x4 | 0;
          x12 ^= u2 << 13 | u2 >>> 19;
          u2 = x12 + x8 | 0;
          x0 ^= u2 << 18 | u2 >>> 14;
          u2 = x5 + x1 | 0;
          x9 ^= u2 << 7 | u2 >>> 25;
          u2 = x9 + x5 | 0;
          x13 ^= u2 << 9 | u2 >>> 23;
          u2 = x13 + x9 | 0;
          x1 ^= u2 << 13 | u2 >>> 19;
          u2 = x1 + x13 | 0;
          x5 ^= u2 << 18 | u2 >>> 14;
          u2 = x10 + x6 | 0;
          x14 ^= u2 << 7 | u2 >>> 25;
          u2 = x14 + x10 | 0;
          x2 ^= u2 << 9 | u2 >>> 23;
          u2 = x2 + x14 | 0;
          x6 ^= u2 << 13 | u2 >>> 19;
          u2 = x6 + x2 | 0;
          x10 ^= u2 << 18 | u2 >>> 14;
          u2 = x15 + x11 | 0;
          x3 ^= u2 << 7 | u2 >>> 25;
          u2 = x3 + x15 | 0;
          x7 ^= u2 << 9 | u2 >>> 23;
          u2 = x7 + x3 | 0;
          x11 ^= u2 << 13 | u2 >>> 19;
          u2 = x11 + x7 | 0;
          x15 ^= u2 << 18 | u2 >>> 14;
          u2 = x0 + x3 | 0;
          x1 ^= u2 << 7 | u2 >>> 25;
          u2 = x1 + x0 | 0;
          x2 ^= u2 << 9 | u2 >>> 23;
          u2 = x2 + x1 | 0;
          x3 ^= u2 << 13 | u2 >>> 19;
          u2 = x3 + x2 | 0;
          x0 ^= u2 << 18 | u2 >>> 14;
          u2 = x5 + x4 | 0;
          x6 ^= u2 << 7 | u2 >>> 25;
          u2 = x6 + x5 | 0;
          x7 ^= u2 << 9 | u2 >>> 23;
          u2 = x7 + x6 | 0;
          x4 ^= u2 << 13 | u2 >>> 19;
          u2 = x4 + x7 | 0;
          x5 ^= u2 << 18 | u2 >>> 14;
          u2 = x10 + x9 | 0;
          x11 ^= u2 << 7 | u2 >>> 25;
          u2 = x11 + x10 | 0;
          x8 ^= u2 << 9 | u2 >>> 23;
          u2 = x8 + x11 | 0;
          x9 ^= u2 << 13 | u2 >>> 19;
          u2 = x9 + x8 | 0;
          x10 ^= u2 << 18 | u2 >>> 14;
          u2 = x15 + x14 | 0;
          x12 ^= u2 << 7 | u2 >>> 25;
          u2 = x12 + x15 | 0;
          x13 ^= u2 << 9 | u2 >>> 23;
          u2 = x13 + x12 | 0;
          x14 ^= u2 << 13 | u2 >>> 19;
          u2 = x14 + x13 | 0;
          x15 ^= u2 << 18 | u2 >>> 14;
        }
        x0 = x0 + j0 | 0;
        x1 = x1 + j1 | 0;
        x2 = x2 + j2 | 0;
        x3 = x3 + j3 | 0;
        x4 = x4 + j4 | 0;
        x5 = x5 + j5 | 0;
        x6 = x6 + j6 | 0;
        x7 = x7 + j7 | 0;
        x8 = x8 + j8 | 0;
        x9 = x9 + j9 | 0;
        x10 = x10 + j10 | 0;
        x11 = x11 + j11 | 0;
        x12 = x12 + j12 | 0;
        x13 = x13 + j13 | 0;
        x14 = x14 + j14 | 0;
        x15 = x15 + j15 | 0;
        o2[0] = x0 >>> 0 & 255;
        o2[1] = x0 >>> 8 & 255;
        o2[2] = x0 >>> 16 & 255;
        o2[3] = x0 >>> 24 & 255;
        o2[4] = x1 >>> 0 & 255;
        o2[5] = x1 >>> 8 & 255;
        o2[6] = x1 >>> 16 & 255;
        o2[7] = x1 >>> 24 & 255;
        o2[8] = x2 >>> 0 & 255;
        o2[9] = x2 >>> 8 & 255;
        o2[10] = x2 >>> 16 & 255;
        o2[11] = x2 >>> 24 & 255;
        o2[12] = x3 >>> 0 & 255;
        o2[13] = x3 >>> 8 & 255;
        o2[14] = x3 >>> 16 & 255;
        o2[15] = x3 >>> 24 & 255;
        o2[16] = x4 >>> 0 & 255;
        o2[17] = x4 >>> 8 & 255;
        o2[18] = x4 >>> 16 & 255;
        o2[19] = x4 >>> 24 & 255;
        o2[20] = x5 >>> 0 & 255;
        o2[21] = x5 >>> 8 & 255;
        o2[22] = x5 >>> 16 & 255;
        o2[23] = x5 >>> 24 & 255;
        o2[24] = x6 >>> 0 & 255;
        o2[25] = x6 >>> 8 & 255;
        o2[26] = x6 >>> 16 & 255;
        o2[27] = x6 >>> 24 & 255;
        o2[28] = x7 >>> 0 & 255;
        o2[29] = x7 >>> 8 & 255;
        o2[30] = x7 >>> 16 & 255;
        o2[31] = x7 >>> 24 & 255;
        o2[32] = x8 >>> 0 & 255;
        o2[33] = x8 >>> 8 & 255;
        o2[34] = x8 >>> 16 & 255;
        o2[35] = x8 >>> 24 & 255;
        o2[36] = x9 >>> 0 & 255;
        o2[37] = x9 >>> 8 & 255;
        o2[38] = x9 >>> 16 & 255;
        o2[39] = x9 >>> 24 & 255;
        o2[40] = x10 >>> 0 & 255;
        o2[41] = x10 >>> 8 & 255;
        o2[42] = x10 >>> 16 & 255;
        o2[43] = x10 >>> 24 & 255;
        o2[44] = x11 >>> 0 & 255;
        o2[45] = x11 >>> 8 & 255;
        o2[46] = x11 >>> 16 & 255;
        o2[47] = x11 >>> 24 & 255;
        o2[48] = x12 >>> 0 & 255;
        o2[49] = x12 >>> 8 & 255;
        o2[50] = x12 >>> 16 & 255;
        o2[51] = x12 >>> 24 & 255;
        o2[52] = x13 >>> 0 & 255;
        o2[53] = x13 >>> 8 & 255;
        o2[54] = x13 >>> 16 & 255;
        o2[55] = x13 >>> 24 & 255;
        o2[56] = x14 >>> 0 & 255;
        o2[57] = x14 >>> 8 & 255;
        o2[58] = x14 >>> 16 & 255;
        o2[59] = x14 >>> 24 & 255;
        o2[60] = x15 >>> 0 & 255;
        o2[61] = x15 >>> 8 & 255;
        o2[62] = x15 >>> 16 & 255;
        o2[63] = x15 >>> 24 & 255;
      }
      function core_hsalsa20(o2, p2, k2, c2) {
        var j0 = c2[0] & 255 | (c2[1] & 255) << 8 | (c2[2] & 255) << 16 | (c2[3] & 255) << 24, j1 = k2[0] & 255 | (k2[1] & 255) << 8 | (k2[2] & 255) << 16 | (k2[3] & 255) << 24, j2 = k2[4] & 255 | (k2[5] & 255) << 8 | (k2[6] & 255) << 16 | (k2[7] & 255) << 24, j3 = k2[8] & 255 | (k2[9] & 255) << 8 | (k2[10] & 255) << 16 | (k2[11] & 255) << 24, j4 = k2[12] & 255 | (k2[13] & 255) << 8 | (k2[14] & 255) << 16 | (k2[15] & 255) << 24, j5 = c2[4] & 255 | (c2[5] & 255) << 8 | (c2[6] & 255) << 16 | (c2[7] & 255) << 24, j6 = p2[0] & 255 | (p2[1] & 255) << 8 | (p2[2] & 255) << 16 | (p2[3] & 255) << 24, j7 = p2[4] & 255 | (p2[5] & 255) << 8 | (p2[6] & 255) << 16 | (p2[7] & 255) << 24, j8 = p2[8] & 255 | (p2[9] & 255) << 8 | (p2[10] & 255) << 16 | (p2[11] & 255) << 24, j9 = p2[12] & 255 | (p2[13] & 255) << 8 | (p2[14] & 255) << 16 | (p2[15] & 255) << 24, j10 = c2[8] & 255 | (c2[9] & 255) << 8 | (c2[10] & 255) << 16 | (c2[11] & 255) << 24, j11 = k2[16] & 255 | (k2[17] & 255) << 8 | (k2[18] & 255) << 16 | (k2[19] & 255) << 24, j12 = k2[20] & 255 | (k2[21] & 255) << 8 | (k2[22] & 255) << 16 | (k2[23] & 255) << 24, j13 = k2[24] & 255 | (k2[25] & 255) << 8 | (k2[26] & 255) << 16 | (k2[27] & 255) << 24, j14 = k2[28] & 255 | (k2[29] & 255) << 8 | (k2[30] & 255) << 16 | (k2[31] & 255) << 24, j15 = c2[12] & 255 | (c2[13] & 255) << 8 | (c2[14] & 255) << 16 | (c2[15] & 255) << 24;
        var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, u2;
        for (var i2 = 0; i2 < 20; i2 += 2) {
          u2 = x0 + x12 | 0;
          x4 ^= u2 << 7 | u2 >>> 25;
          u2 = x4 + x0 | 0;
          x8 ^= u2 << 9 | u2 >>> 23;
          u2 = x8 + x4 | 0;
          x12 ^= u2 << 13 | u2 >>> 19;
          u2 = x12 + x8 | 0;
          x0 ^= u2 << 18 | u2 >>> 14;
          u2 = x5 + x1 | 0;
          x9 ^= u2 << 7 | u2 >>> 25;
          u2 = x9 + x5 | 0;
          x13 ^= u2 << 9 | u2 >>> 23;
          u2 = x13 + x9 | 0;
          x1 ^= u2 << 13 | u2 >>> 19;
          u2 = x1 + x13 | 0;
          x5 ^= u2 << 18 | u2 >>> 14;
          u2 = x10 + x6 | 0;
          x14 ^= u2 << 7 | u2 >>> 25;
          u2 = x14 + x10 | 0;
          x2 ^= u2 << 9 | u2 >>> 23;
          u2 = x2 + x14 | 0;
          x6 ^= u2 << 13 | u2 >>> 19;
          u2 = x6 + x2 | 0;
          x10 ^= u2 << 18 | u2 >>> 14;
          u2 = x15 + x11 | 0;
          x3 ^= u2 << 7 | u2 >>> 25;
          u2 = x3 + x15 | 0;
          x7 ^= u2 << 9 | u2 >>> 23;
          u2 = x7 + x3 | 0;
          x11 ^= u2 << 13 | u2 >>> 19;
          u2 = x11 + x7 | 0;
          x15 ^= u2 << 18 | u2 >>> 14;
          u2 = x0 + x3 | 0;
          x1 ^= u2 << 7 | u2 >>> 25;
          u2 = x1 + x0 | 0;
          x2 ^= u2 << 9 | u2 >>> 23;
          u2 = x2 + x1 | 0;
          x3 ^= u2 << 13 | u2 >>> 19;
          u2 = x3 + x2 | 0;
          x0 ^= u2 << 18 | u2 >>> 14;
          u2 = x5 + x4 | 0;
          x6 ^= u2 << 7 | u2 >>> 25;
          u2 = x6 + x5 | 0;
          x7 ^= u2 << 9 | u2 >>> 23;
          u2 = x7 + x6 | 0;
          x4 ^= u2 << 13 | u2 >>> 19;
          u2 = x4 + x7 | 0;
          x5 ^= u2 << 18 | u2 >>> 14;
          u2 = x10 + x9 | 0;
          x11 ^= u2 << 7 | u2 >>> 25;
          u2 = x11 + x10 | 0;
          x8 ^= u2 << 9 | u2 >>> 23;
          u2 = x8 + x11 | 0;
          x9 ^= u2 << 13 | u2 >>> 19;
          u2 = x9 + x8 | 0;
          x10 ^= u2 << 18 | u2 >>> 14;
          u2 = x15 + x14 | 0;
          x12 ^= u2 << 7 | u2 >>> 25;
          u2 = x12 + x15 | 0;
          x13 ^= u2 << 9 | u2 >>> 23;
          u2 = x13 + x12 | 0;
          x14 ^= u2 << 13 | u2 >>> 19;
          u2 = x14 + x13 | 0;
          x15 ^= u2 << 18 | u2 >>> 14;
        }
        o2[0] = x0 >>> 0 & 255;
        o2[1] = x0 >>> 8 & 255;
        o2[2] = x0 >>> 16 & 255;
        o2[3] = x0 >>> 24 & 255;
        o2[4] = x5 >>> 0 & 255;
        o2[5] = x5 >>> 8 & 255;
        o2[6] = x5 >>> 16 & 255;
        o2[7] = x5 >>> 24 & 255;
        o2[8] = x10 >>> 0 & 255;
        o2[9] = x10 >>> 8 & 255;
        o2[10] = x10 >>> 16 & 255;
        o2[11] = x10 >>> 24 & 255;
        o2[12] = x15 >>> 0 & 255;
        o2[13] = x15 >>> 8 & 255;
        o2[14] = x15 >>> 16 & 255;
        o2[15] = x15 >>> 24 & 255;
        o2[16] = x6 >>> 0 & 255;
        o2[17] = x6 >>> 8 & 255;
        o2[18] = x6 >>> 16 & 255;
        o2[19] = x6 >>> 24 & 255;
        o2[20] = x7 >>> 0 & 255;
        o2[21] = x7 >>> 8 & 255;
        o2[22] = x7 >>> 16 & 255;
        o2[23] = x7 >>> 24 & 255;
        o2[24] = x8 >>> 0 & 255;
        o2[25] = x8 >>> 8 & 255;
        o2[26] = x8 >>> 16 & 255;
        o2[27] = x8 >>> 24 & 255;
        o2[28] = x9 >>> 0 & 255;
        o2[29] = x9 >>> 8 & 255;
        o2[30] = x9 >>> 16 & 255;
        o2[31] = x9 >>> 24 & 255;
      }
    }
  });

  // node_modules/sodium-javascript/crypto_stream.js
  var require_crypto_stream = __commonJS({
    "node_modules/sodium-javascript/crypto_stream.js"(exports) {
      var xsalsa20 = require_xsalsa202();
      if (new Uint16Array([1])[0] !== 1) throw new Error("Big endian architecture is not supported.");
      exports.crypto_stream_KEYBYTES = 32;
      exports.crypto_stream_NONCEBYTES = 24;
      exports.crypto_stream_PRIMITIVE = "xsalsa20";
      exports.crypto_stream_xsalsa20_MESSAGEBYTES_MAX = Number.MAX_SAFE_INTEGER;
      exports.crypto_stream = function(c2, nonce, key) {
        c2.fill(0);
        exports.crypto_stream_xor(c2, c2, nonce, key);
      };
      exports.crypto_stream_xor = function(c2, m2, nonce, key) {
        const xor = xsalsa20(nonce, key);
        xor.update(m2, c2);
        xor.final();
      };
      exports.crypto_stream_xor_instance = function(nonce, key) {
        return new XOR(nonce, key);
      };
      function XOR(nonce, key) {
        this._instance = xsalsa20(nonce, key);
      }
      XOR.prototype.update = function(out, inp) {
        this._instance.update(inp, out);
      };
      XOR.prototype.final = function() {
        this._instance.finalize();
        this._instance = null;
      };
    }
  });

  // node_modules/sodium-javascript/internal/poly1305.js
  var require_poly1305 = __commonJS({
    "node_modules/sodium-javascript/internal/poly1305.js"(exports, module) {
      if (new Uint16Array([1])[0] !== 1) throw new Error("Big endian architecture is not supported.");
      var poly1305 = function(key) {
        this.buffer = new Uint8Array(16);
        this.r = new Uint16Array(10);
        this.h = new Uint16Array(10);
        this.pad = new Uint16Array(8);
        this.leftover = 0;
        this.fin = 0;
        var t0, t1, t2, t3, t4, t5, t6, t7;
        t0 = key[0] & 255 | (key[1] & 255) << 8;
        this.r[0] = t0 & 8191;
        t1 = key[2] & 255 | (key[3] & 255) << 8;
        this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
        t2 = key[4] & 255 | (key[5] & 255) << 8;
        this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
        t3 = key[6] & 255 | (key[7] & 255) << 8;
        this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
        t4 = key[8] & 255 | (key[9] & 255) << 8;
        this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
        this.r[5] = t4 >>> 1 & 8190;
        t5 = key[10] & 255 | (key[11] & 255) << 8;
        this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
        t6 = key[12] & 255 | (key[13] & 255) << 8;
        this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
        t7 = key[14] & 255 | (key[15] & 255) << 8;
        this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
        this.r[9] = t7 >>> 5 & 127;
        this.pad[0] = key[16] & 255 | (key[17] & 255) << 8;
        this.pad[1] = key[18] & 255 | (key[19] & 255) << 8;
        this.pad[2] = key[20] & 255 | (key[21] & 255) << 8;
        this.pad[3] = key[22] & 255 | (key[23] & 255) << 8;
        this.pad[4] = key[24] & 255 | (key[25] & 255) << 8;
        this.pad[5] = key[26] & 255 | (key[27] & 255) << 8;
        this.pad[6] = key[28] & 255 | (key[29] & 255) << 8;
        this.pad[7] = key[30] & 255 | (key[31] & 255) << 8;
      };
      poly1305.prototype.blocks = function(m2, mpos, bytes) {
        var hibit = this.fin ? 0 : 1 << 11;
        var t0, t1, t2, t3, t4, t5, t6, t7, c2;
        var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;
        var h0 = this.h[0], h1 = this.h[1], h2 = this.h[2], h3 = this.h[3], h4 = this.h[4], h5 = this.h[5], h6 = this.h[6], h7 = this.h[7], h8 = this.h[8], h9 = this.h[9];
        var r0 = this.r[0], r1 = this.r[1], r2 = this.r[2], r3 = this.r[3], r4 = this.r[4], r5 = this.r[5], r6 = this.r[6], r7 = this.r[7], r8 = this.r[8], r9 = this.r[9];
        while (bytes >= 16) {
          t0 = m2[mpos + 0] & 255 | (m2[mpos + 1] & 255) << 8;
          h0 += t0 & 8191;
          t1 = m2[mpos + 2] & 255 | (m2[mpos + 3] & 255) << 8;
          h1 += (t0 >>> 13 | t1 << 3) & 8191;
          t2 = m2[mpos + 4] & 255 | (m2[mpos + 5] & 255) << 8;
          h2 += (t1 >>> 10 | t2 << 6) & 8191;
          t3 = m2[mpos + 6] & 255 | (m2[mpos + 7] & 255) << 8;
          h3 += (t2 >>> 7 | t3 << 9) & 8191;
          t4 = m2[mpos + 8] & 255 | (m2[mpos + 9] & 255) << 8;
          h4 += (t3 >>> 4 | t4 << 12) & 8191;
          h5 += t4 >>> 1 & 8191;
          t5 = m2[mpos + 10] & 255 | (m2[mpos + 11] & 255) << 8;
          h6 += (t4 >>> 14 | t5 << 2) & 8191;
          t6 = m2[mpos + 12] & 255 | (m2[mpos + 13] & 255) << 8;
          h7 += (t5 >>> 11 | t6 << 5) & 8191;
          t7 = m2[mpos + 14] & 255 | (m2[mpos + 15] & 255) << 8;
          h8 += (t6 >>> 8 | t7 << 8) & 8191;
          h9 += t7 >>> 5 | hibit;
          c2 = 0;
          d0 = c2;
          d0 += h0 * r0;
          d0 += h1 * (5 * r9);
          d0 += h2 * (5 * r8);
          d0 += h3 * (5 * r7);
          d0 += h4 * (5 * r6);
          c2 = d0 >>> 13;
          d0 &= 8191;
          d0 += h5 * (5 * r5);
          d0 += h6 * (5 * r4);
          d0 += h7 * (5 * r3);
          d0 += h8 * (5 * r2);
          d0 += h9 * (5 * r1);
          c2 += d0 >>> 13;
          d0 &= 8191;
          d1 = c2;
          d1 += h0 * r1;
          d1 += h1 * r0;
          d1 += h2 * (5 * r9);
          d1 += h3 * (5 * r8);
          d1 += h4 * (5 * r7);
          c2 = d1 >>> 13;
          d1 &= 8191;
          d1 += h5 * (5 * r6);
          d1 += h6 * (5 * r5);
          d1 += h7 * (5 * r4);
          d1 += h8 * (5 * r3);
          d1 += h9 * (5 * r2);
          c2 += d1 >>> 13;
          d1 &= 8191;
          d2 = c2;
          d2 += h0 * r2;
          d2 += h1 * r1;
          d2 += h2 * r0;
          d2 += h3 * (5 * r9);
          d2 += h4 * (5 * r8);
          c2 = d2 >>> 13;
          d2 &= 8191;
          d2 += h5 * (5 * r7);
          d2 += h6 * (5 * r6);
          d2 += h7 * (5 * r5);
          d2 += h8 * (5 * r4);
          d2 += h9 * (5 * r3);
          c2 += d2 >>> 13;
          d2 &= 8191;
          d3 = c2;
          d3 += h0 * r3;
          d3 += h1 * r2;
          d3 += h2 * r1;
          d3 += h3 * r0;
          d3 += h4 * (5 * r9);
          c2 = d3 >>> 13;
          d3 &= 8191;
          d3 += h5 * (5 * r8);
          d3 += h6 * (5 * r7);
          d3 += h7 * (5 * r6);
          d3 += h8 * (5 * r5);
          d3 += h9 * (5 * r4);
          c2 += d3 >>> 13;
          d3 &= 8191;
          d4 = c2;
          d4 += h0 * r4;
          d4 += h1 * r3;
          d4 += h2 * r2;
          d4 += h3 * r1;
          d4 += h4 * r0;
          c2 = d4 >>> 13;
          d4 &= 8191;
          d4 += h5 * (5 * r9);
          d4 += h6 * (5 * r8);
          d4 += h7 * (5 * r7);
          d4 += h8 * (5 * r6);
          d4 += h9 * (5 * r5);
          c2 += d4 >>> 13;
          d4 &= 8191;
          d5 = c2;
          d5 += h0 * r5;
          d5 += h1 * r4;
          d5 += h2 * r3;
          d5 += h3 * r2;
          d5 += h4 * r1;
          c2 = d5 >>> 13;
          d5 &= 8191;
          d5 += h5 * r0;
          d5 += h6 * (5 * r9);
          d5 += h7 * (5 * r8);
          d5 += h8 * (5 * r7);
          d5 += h9 * (5 * r6);
          c2 += d5 >>> 13;
          d5 &= 8191;
          d6 = c2;
          d6 += h0 * r6;
          d6 += h1 * r5;
          d6 += h2 * r4;
          d6 += h3 * r3;
          d6 += h4 * r2;
          c2 = d6 >>> 13;
          d6 &= 8191;
          d6 += h5 * r1;
          d6 += h6 * r0;
          d6 += h7 * (5 * r9);
          d6 += h8 * (5 * r8);
          d6 += h9 * (5 * r7);
          c2 += d6 >>> 13;
          d6 &= 8191;
          d7 = c2;
          d7 += h0 * r7;
          d7 += h1 * r6;
          d7 += h2 * r5;
          d7 += h3 * r4;
          d7 += h4 * r3;
          c2 = d7 >>> 13;
          d7 &= 8191;
          d7 += h5 * r2;
          d7 += h6 * r1;
          d7 += h7 * r0;
          d7 += h8 * (5 * r9);
          d7 += h9 * (5 * r8);
          c2 += d7 >>> 13;
          d7 &= 8191;
          d8 = c2;
          d8 += h0 * r8;
          d8 += h1 * r7;
          d8 += h2 * r6;
          d8 += h3 * r5;
          d8 += h4 * r4;
          c2 = d8 >>> 13;
          d8 &= 8191;
          d8 += h5 * r3;
          d8 += h6 * r2;
          d8 += h7 * r1;
          d8 += h8 * r0;
          d8 += h9 * (5 * r9);
          c2 += d8 >>> 13;
          d8 &= 8191;
          d9 = c2;
          d9 += h0 * r9;
          d9 += h1 * r8;
          d9 += h2 * r7;
          d9 += h3 * r6;
          d9 += h4 * r5;
          c2 = d9 >>> 13;
          d9 &= 8191;
          d9 += h5 * r4;
          d9 += h6 * r3;
          d9 += h7 * r2;
          d9 += h8 * r1;
          d9 += h9 * r0;
          c2 += d9 >>> 13;
          d9 &= 8191;
          c2 = (c2 << 2) + c2 | 0;
          c2 = c2 + d0 | 0;
          d0 = c2 & 8191;
          c2 = c2 >>> 13;
          d1 += c2;
          h0 = d0;
          h1 = d1;
          h2 = d2;
          h3 = d3;
          h4 = d4;
          h5 = d5;
          h6 = d6;
          h7 = d7;
          h8 = d8;
          h9 = d9;
          mpos += 16;
          bytes -= 16;
        }
        this.h[0] = h0;
        this.h[1] = h1;
        this.h[2] = h2;
        this.h[3] = h3;
        this.h[4] = h4;
        this.h[5] = h5;
        this.h[6] = h6;
        this.h[7] = h7;
        this.h[8] = h8;
        this.h[9] = h9;
      };
      poly1305.prototype.finish = function(mac, macpos) {
        var g2 = new Uint16Array(10);
        var c2, mask, f2, i2;
        if (this.leftover) {
          i2 = this.leftover;
          this.buffer[i2++] = 1;
          for (; i2 < 16; i2++) this.buffer[i2] = 0;
          this.fin = 1;
          this.blocks(this.buffer, 0, 16);
        }
        c2 = this.h[1] >>> 13;
        this.h[1] &= 8191;
        for (i2 = 2; i2 < 10; i2++) {
          this.h[i2] += c2;
          c2 = this.h[i2] >>> 13;
          this.h[i2] &= 8191;
        }
        this.h[0] += c2 * 5;
        c2 = this.h[0] >>> 13;
        this.h[0] &= 8191;
        this.h[1] += c2;
        c2 = this.h[1] >>> 13;
        this.h[1] &= 8191;
        this.h[2] += c2;
        g2[0] = this.h[0] + 5;
        c2 = g2[0] >>> 13;
        g2[0] &= 8191;
        for (i2 = 1; i2 < 10; i2++) {
          g2[i2] = this.h[i2] + c2;
          c2 = g2[i2] >>> 13;
          g2[i2] &= 8191;
        }
        g2[9] -= 1 << 13;
        mask = (c2 ^ 1) - 1;
        for (i2 = 0; i2 < 10; i2++) g2[i2] &= mask;
        mask = ~mask;
        for (i2 = 0; i2 < 10; i2++) this.h[i2] = this.h[i2] & mask | g2[i2];
        this.h[0] = (this.h[0] | this.h[1] << 13) & 65535;
        this.h[1] = (this.h[1] >>> 3 | this.h[2] << 10) & 65535;
        this.h[2] = (this.h[2] >>> 6 | this.h[3] << 7) & 65535;
        this.h[3] = (this.h[3] >>> 9 | this.h[4] << 4) & 65535;
        this.h[4] = (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14) & 65535;
        this.h[5] = (this.h[6] >>> 2 | this.h[7] << 11) & 65535;
        this.h[6] = (this.h[7] >>> 5 | this.h[8] << 8) & 65535;
        this.h[7] = (this.h[8] >>> 8 | this.h[9] << 5) & 65535;
        f2 = this.h[0] + this.pad[0];
        this.h[0] = f2 & 65535;
        for (i2 = 1; i2 < 8; i2++) {
          f2 = (this.h[i2] + this.pad[i2] | 0) + (f2 >>> 16) | 0;
          this.h[i2] = f2 & 65535;
        }
        mac[macpos + 0] = this.h[0] >>> 0 & 255;
        mac[macpos + 1] = this.h[0] >>> 8 & 255;
        mac[macpos + 2] = this.h[1] >>> 0 & 255;
        mac[macpos + 3] = this.h[1] >>> 8 & 255;
        mac[macpos + 4] = this.h[2] >>> 0 & 255;
        mac[macpos + 5] = this.h[2] >>> 8 & 255;
        mac[macpos + 6] = this.h[3] >>> 0 & 255;
        mac[macpos + 7] = this.h[3] >>> 8 & 255;
        mac[macpos + 8] = this.h[4] >>> 0 & 255;
        mac[macpos + 9] = this.h[4] >>> 8 & 255;
        mac[macpos + 10] = this.h[5] >>> 0 & 255;
        mac[macpos + 11] = this.h[5] >>> 8 & 255;
        mac[macpos + 12] = this.h[6] >>> 0 & 255;
        mac[macpos + 13] = this.h[6] >>> 8 & 255;
        mac[macpos + 14] = this.h[7] >>> 0 & 255;
        mac[macpos + 15] = this.h[7] >>> 8 & 255;
      };
      poly1305.prototype.update = function(m2, mpos, bytes) {
        var i2, want;
        if (this.leftover) {
          want = 16 - this.leftover;
          if (want > bytes)
            want = bytes;
          for (i2 = 0; i2 < want; i2++)
            this.buffer[this.leftover + i2] = m2[mpos + i2];
          bytes -= want;
          mpos += want;
          this.leftover += want;
          if (this.leftover < 16)
            return;
          this.blocks(this.buffer, 0, 16);
          this.leftover = 0;
        }
        if (bytes >= 16) {
          want = bytes - bytes % 16;
          this.blocks(m2, mpos, want);
          mpos += want;
          bytes -= want;
        }
        if (bytes) {
          for (i2 = 0; i2 < bytes; i2++)
            this.buffer[this.leftover + i2] = m2[mpos + i2];
          this.leftover += bytes;
        }
      };
      module.exports = poly1305;
    }
  });

  // node_modules/sodium-javascript/crypto_onetimeauth.js
  var require_crypto_onetimeauth = __commonJS({
    "node_modules/sodium-javascript/crypto_onetimeauth.js"(exports, module) {
      var assert = require_nanoassert();
      var Poly1305 = require_poly1305();
      var { crypto_verify_16 } = require_crypto_verify();
      var crypto_onetimeauth_BYTES = 16;
      var crypto_onetimeauth_KEYBYTES = 32;
      var crypto_onetimeauth_PRIMITIVE = "poly1305";
      module.exports = {
        crypto_onetimeauth,
        crypto_onetimeauth_verify,
        crypto_onetimeauth_BYTES,
        crypto_onetimeauth_KEYBYTES,
        crypto_onetimeauth_PRIMITIVE
      };
      function crypto_onetimeauth(mac, msg, key) {
        assert(mac.byteLength === crypto_onetimeauth_BYTES, "mac must be 'crypto_onetimeauth_BYTES' bytes");
        assert(msg.byteLength != null, "msg must be buffer");
        assert(key.byteLength === crypto_onetimeauth_KEYBYTES, "key must be 'crypto_onetimeauth_KEYBYTES' bytes");
        var s2 = new Poly1305(key);
        s2.update(msg, 0, msg.byteLength);
        s2.finish(mac, 0);
      }
      function crypto_onetimeauth_verify(mac, msg, key) {
        assert(mac.byteLength === crypto_onetimeauth_BYTES, "mac must be 'crypto_onetimeauth_BYTES' bytes");
        assert(msg.byteLength != null, "msg must be buffer");
        assert(key.byteLength === crypto_onetimeauth_KEYBYTES, "key must be 'crypto_onetimeauth_KEYBYTES' bytes");
        var tmp = new Uint8Array(16);
        crypto_onetimeauth(tmp, msg, key);
        return crypto_verify_16(mac, 0, tmp, 0);
      }
    }
  });

  // node_modules/sodium-javascript/crypto_secretbox.js
  var require_crypto_secretbox = __commonJS({
    "node_modules/sodium-javascript/crypto_secretbox.js"(exports, module) {
      var assert = require_nanoassert();
      var { crypto_stream, crypto_stream_xor } = require_crypto_stream();
      var { crypto_onetimeauth, crypto_onetimeauth_verify, crypto_onetimeauth_BYTES, crypto_onetimeauth_KEYBYTES } = require_crypto_onetimeauth();
      var crypto_secretbox_KEYBYTES = 32;
      var crypto_secretbox_NONCEBYTES = 24;
      var crypto_secretbox_ZEROBYTES = 32;
      var crypto_secretbox_BOXZEROBYTES = 16;
      var crypto_secretbox_MACBYTES = 16;
      module.exports = {
        crypto_secretbox,
        crypto_secretbox_open,
        crypto_secretbox_detached,
        crypto_secretbox_open_detached,
        crypto_secretbox_easy,
        crypto_secretbox_open_easy,
        crypto_secretbox_KEYBYTES,
        crypto_secretbox_NONCEBYTES,
        crypto_secretbox_ZEROBYTES,
        crypto_secretbox_BOXZEROBYTES,
        crypto_secretbox_MACBYTES
      };
      function crypto_secretbox(c2, m2, n2, k2) {
        assert(c2.byteLength === m2.byteLength, "c must be 'm.byteLength' bytes");
        const mlen = m2.byteLength;
        assert(mlen >= crypto_secretbox_ZEROBYTES, "mlen must be at least 'crypto_secretbox_ZEROBYTES'");
        assert(n2.byteLength === crypto_secretbox_NONCEBYTES, "n must be 'crypto_secretbox_NONCEBYTES' bytes");
        assert(k2.byteLength === crypto_secretbox_KEYBYTES, "k must be 'crypto_secretbox_KEYBYTES' bytes");
        crypto_stream_xor(c2, m2, n2, k2);
        crypto_onetimeauth(
          c2.subarray(crypto_secretbox_BOXZEROBYTES, crypto_secretbox_BOXZEROBYTES + crypto_onetimeauth_BYTES),
          c2.subarray(crypto_secretbox_BOXZEROBYTES + crypto_onetimeauth_BYTES, c2.byteLength),
          c2.subarray(0, crypto_onetimeauth_KEYBYTES)
        );
        c2.fill(0, 0, crypto_secretbox_BOXZEROBYTES);
      }
      function crypto_secretbox_open(m2, c2, n2, k2) {
        assert(c2.byteLength === m2.byteLength, "c must be 'm.byteLength' bytes");
        const mlen = m2.byteLength;
        assert(mlen >= crypto_secretbox_ZEROBYTES, "mlen must be at least 'crypto_secretbox_ZEROBYTES'");
        assert(n2.byteLength === crypto_secretbox_NONCEBYTES, "n must be 'crypto_secretbox_NONCEBYTES' bytes");
        assert(k2.byteLength === crypto_secretbox_KEYBYTES, "k must be 'crypto_secretbox_KEYBYTES' bytes");
        const x2 = new Uint8Array(crypto_onetimeauth_KEYBYTES);
        crypto_stream(x2, n2, k2);
        const validMac = crypto_onetimeauth_verify(
          c2.subarray(crypto_secretbox_BOXZEROBYTES, crypto_secretbox_BOXZEROBYTES + crypto_onetimeauth_BYTES),
          c2.subarray(crypto_secretbox_BOXZEROBYTES + crypto_onetimeauth_BYTES, c2.byteLength),
          x2
        );
        if (validMac === false) return false;
        crypto_stream_xor(m2, c2, n2, k2);
        m2.fill(0, 0, 32);
        return true;
      }
      function crypto_secretbox_detached(o2, mac, msg, n2, k2) {
        assert(o2.byteLength === msg.byteLength, "o must be 'msg.byteLength' bytes");
        assert(mac.byteLength === crypto_secretbox_MACBYTES, "mac must be 'crypto_secretbox_MACBYTES' bytes");
        assert(n2.byteLength === crypto_secretbox_NONCEBYTES, "n must be 'crypto_secretbox_NONCEBYTES' bytes");
        assert(k2.byteLength === crypto_secretbox_KEYBYTES, "k must be 'crypto_secretbox_KEYBYTES' bytes");
        const tmp = new Uint8Array(msg.byteLength + mac.byteLength);
        crypto_secretbox_easy(tmp, msg, n2, k2);
        mac.set(tmp.subarray(0, mac.byteLength));
        o2.set(tmp.subarray(mac.byteLength));
        return true;
      }
      function crypto_secretbox_open_detached(msg, o2, mac, n2, k2) {
        assert(o2.byteLength === msg.byteLength, "o must be 'msg.byteLength' bytes");
        assert(mac.byteLength === crypto_secretbox_MACBYTES, "mac must be 'crypto_secretbox_MACBYTES' bytes");
        assert(n2.byteLength === crypto_secretbox_NONCEBYTES, "n must be 'crypto_secretbox_NONCEBYTES' bytes");
        assert(k2.byteLength === crypto_secretbox_KEYBYTES, "k must be 'crypto_secretbox_KEYBYTES' bytes");
        const tmp = new Uint8Array(o2.byteLength + mac.byteLength);
        tmp.set(mac);
        tmp.set(o2, mac.byteLength);
        return crypto_secretbox_open_easy(msg, tmp, n2, k2);
      }
      function crypto_secretbox_easy(o2, msg, n2, k2) {
        assert(o2.byteLength === msg.byteLength + crypto_secretbox_MACBYTES, "o must be 'msg.byteLength + crypto_secretbox_MACBYTES' bytes");
        assert(n2.byteLength === crypto_secretbox_NONCEBYTES, "n must be 'crypto_secretbox_NONCEBYTES' bytes");
        assert(k2.byteLength === crypto_secretbox_KEYBYTES, "k must be 'crypto_secretbox_KEYBYTES' bytes");
        const m2 = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.byteLength);
        const c2 = new Uint8Array(m2.byteLength);
        m2.set(msg, crypto_secretbox_ZEROBYTES);
        crypto_secretbox(c2, m2, n2, k2);
        o2.set(c2.subarray(crypto_secretbox_BOXZEROBYTES));
      }
      function crypto_secretbox_open_easy(msg, box, n2, k2) {
        assert(box.byteLength === msg.byteLength + crypto_secretbox_MACBYTES, "box must be 'msg.byteLength + crypto_secretbox_MACBYTES' bytes");
        assert(n2.byteLength === crypto_secretbox_NONCEBYTES, "n must be 'crypto_secretbox_NONCEBYTES' bytes");
        assert(k2.byteLength === crypto_secretbox_KEYBYTES, "k must be 'crypto_secretbox_KEYBYTES' bytes");
        const c2 = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.byteLength);
        const m2 = new Uint8Array(c2.byteLength);
        c2.set(box, crypto_secretbox_BOXZEROBYTES);
        if (crypto_secretbox_open(m2, c2, n2, k2) === false) return false;
        msg.set(m2.subarray(crypto_secretbox_ZEROBYTES));
        return true;
      }
    }
  });

  // node_modules/sodium-javascript/crypto_box.js
  var require_crypto_box = __commonJS({
    "node_modules/sodium-javascript/crypto_box.js"(exports, module) {
      var { crypto_hash_sha512 } = require_crypto_hash();
      var { crypto_scalarmult, crypto_scalarmult_base } = require_crypto_scalarmult();
      var { randombytes } = require_randombytes();
      var { crypto_generichash_batch } = require_crypto_generichash();
      var { crypto_stream_xsalsa20_MESSAGEBYTES_MAX } = require_crypto_stream();
      var {
        crypto_secretbox_open_easy,
        crypto_secretbox_easy,
        crypto_secretbox_detached,
        crypto_secretbox_open_detached
      } = require_crypto_secretbox();
      var xsalsa20 = require_xsalsa202();
      var assert = require_nanoassert();
      var crypto_box_PUBLICKEYBYTES = 32;
      var crypto_box_SECRETKEYBYTES = 32;
      var crypto_box_NONCEBYTES = 24;
      var crypto_box_ZEROBYTES = 32;
      var crypto_box_BOXZEROBYTES = 16;
      var crypto_box_SEALBYTES = 48;
      var crypto_box_SEEDBYTES = 32;
      var crypto_box_BEFORENMBYTES = 32;
      var crypto_box_MACBYTES = 16;
      var crypto_box_curve25519xsalsa20poly1305_MACBYTES = 16;
      var crypto_box_MESSAGEBYTES_MAX = crypto_stream_xsalsa20_MESSAGEBYTES_MAX - crypto_box_curve25519xsalsa20poly1305_MACBYTES;
      module.exports = {
        crypto_box_easy,
        crypto_box_open_easy,
        crypto_box_keypair,
        crypto_box_seed_keypair,
        crypto_box_seal,
        crypto_box_seal_open,
        crypto_box_PUBLICKEYBYTES,
        crypto_box_SECRETKEYBYTES,
        crypto_box_NONCEBYTES,
        crypto_box_ZEROBYTES,
        crypto_box_BOXZEROBYTES,
        crypto_box_SEALBYTES,
        crypto_box_SEEDBYTES,
        crypto_box_BEFORENMBYTES,
        crypto_box_MACBYTES
      };
      function crypto_box_keypair(pk, sk) {
        check2(pk, crypto_box_PUBLICKEYBYTES);
        check2(sk, crypto_box_SECRETKEYBYTES);
        randombytes(sk, 32);
        return crypto_scalarmult_base(pk, sk);
      }
      function crypto_box_seed_keypair(pk, sk, seed) {
        assert(pk.byteLength === crypto_box_PUBLICKEYBYTES, "pk should be 'crypto_box_PUBLICKEYBYTES' bytes");
        assert(sk.byteLength === crypto_box_SECRETKEYBYTES, "sk should be 'crypto_box_SECRETKEYBYTES' bytes");
        assert(sk.byteLength === crypto_box_SEEDBYTES, "sk should be 'crypto_box_SEEDBYTES' bytes");
        const hash = new Uint8Array(64);
        crypto_hash_sha512(hash, seed, 32);
        sk.set(hash.subarray(0, 32));
        hash.fill(0);
        return crypto_scalarmult_base(pk, sk);
      }
      function crypto_box_seal(c2, m2, pk) {
        check2(c2, crypto_box_SEALBYTES + m2.length);
        check2(pk, crypto_box_PUBLICKEYBYTES);
        var epk = c2.subarray(0, crypto_box_PUBLICKEYBYTES);
        var esk = new Uint8Array(crypto_box_SECRETKEYBYTES);
        crypto_box_keypair(epk, esk);
        var n2 = new Uint8Array(crypto_box_NONCEBYTES);
        crypto_generichash_batch(n2, [epk, pk]);
        var s2 = new Uint8Array(crypto_box_PUBLICKEYBYTES);
        crypto_scalarmult(s2, esk, pk);
        var k2 = new Uint8Array(crypto_box_BEFORENMBYTES);
        var zero = new Uint8Array(16);
        xsalsa20.core_hsalsa20(k2, zero, s2, xsalsa20.SIGMA);
        crypto_secretbox_easy(c2.subarray(epk.length), m2, n2, k2);
        cleanup(esk);
      }
      function crypto_box_seal_open(m2, c2, pk, sk) {
        check2(c2, crypto_box_SEALBYTES);
        check2(m2, c2.length - crypto_box_SEALBYTES);
        check2(pk, crypto_box_PUBLICKEYBYTES);
        check2(sk, crypto_box_SECRETKEYBYTES);
        var epk = c2.subarray(0, crypto_box_PUBLICKEYBYTES);
        var n2 = new Uint8Array(crypto_box_NONCEBYTES);
        crypto_generichash_batch(n2, [epk, pk]);
        var s2 = new Uint8Array(crypto_box_PUBLICKEYBYTES);
        crypto_scalarmult(s2, sk, epk);
        var k2 = new Uint8Array(crypto_box_BEFORENMBYTES);
        var zero = new Uint8Array(16);
        xsalsa20.core_hsalsa20(k2, zero, s2, xsalsa20.SIGMA);
        return crypto_secretbox_open_easy(m2, c2.subarray(epk.length), n2, k2);
      }
      function crypto_box_beforenm(k2, pk, sk) {
        const zero = new Uint8Array(16);
        const s2 = new Uint8Array(32);
        assert(crypto_scalarmult(s2, sk, pk) === 0);
        xsalsa20.core_hsalsa20(k2, zero, s2, xsalsa20.SIGMA);
        return true;
      }
      function crypto_box_detached_afternm(c2, mac, m2, n2, k2) {
        return crypto_secretbox_detached(c2, mac, m2, n2, k2);
      }
      function crypto_box_detached(c2, mac, m2, n2, pk, sk) {
        check2(mac, crypto_box_MACBYTES);
        check2(n2, crypto_box_NONCEBYTES);
        check2(pk, crypto_box_PUBLICKEYBYTES);
        check2(sk, crypto_box_SECRETKEYBYTES);
        const k2 = new Uint8Array(crypto_box_BEFORENMBYTES);
        assert(crypto_box_beforenm(k2, pk, sk));
        const ret = crypto_box_detached_afternm(c2, mac, m2, n2, k2);
        cleanup(k2);
        return ret;
      }
      function crypto_box_easy(c2, m2, n2, pk, sk) {
        assert(
          c2.length >= m2.length + crypto_box_MACBYTES,
          "c should be at least 'm.length + crypto_box_MACBYTES' bytes"
        );
        assert(
          m2.length <= crypto_box_MESSAGEBYTES_MAX,
          "m should be at most 'crypto_box_MESSAGEBYTES_MAX' bytes"
        );
        return crypto_box_detached(
          c2.subarray(crypto_box_MACBYTES, m2.length + crypto_box_MACBYTES),
          c2.subarray(0, crypto_box_MACBYTES),
          m2,
          n2,
          pk,
          sk
        );
      }
      function crypto_box_open_detached_afternm(m2, c2, mac, n2, k2) {
        return crypto_secretbox_open_detached(m2, c2, mac, n2, k2);
      }
      function crypto_box_open_detached(m2, c2, mac, n2, pk, sk) {
        const k2 = new Uint8Array(crypto_box_BEFORENMBYTES);
        assert(crypto_box_beforenm(k2, pk, sk));
        const ret = crypto_box_open_detached_afternm(m2, c2, mac, n2, k2);
        cleanup(k2);
        return ret;
      }
      function crypto_box_open_easy(m2, c2, n2, pk, sk) {
        assert(
          c2.length >= m2.length + crypto_box_MACBYTES,
          "c should be at least 'm.length + crypto_box_MACBYTES' bytes"
        );
        return crypto_box_open_detached(
          m2,
          c2.subarray(crypto_box_MACBYTES, m2.length + crypto_box_MACBYTES),
          c2.subarray(0, crypto_box_MACBYTES),
          n2,
          pk,
          sk
        );
      }
      function check2(buf, len) {
        if (!buf || len && buf.length < len) throw new Error("Argument must be a buffer" + (len ? " of length " + len : ""));
      }
      function cleanup(arr) {
        for (let i2 = 0; i2 < arr.length; i2++) arr[i2] = 0;
      }
    }
  });

  // node_modules/sha256-universal/sha256.js
  var require_sha256 = __commonJS({
    "node_modules/sha256-universal/sha256.js"(exports, module) {
      var assert = require_nanoassert();
      var b4a = require_browser();
      module.exports = Sha256;
      var SHA256_BYTES = module.exports.SHA256_BYTES = 32;
      var BLOCKSIZE = 64;
      var K2 = [
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ];
      function expand(a2, b2, c2, d2) {
        var b_ = ((a2 >>> 17 | a2 << 15) ^ (a2 >>> 19 | a2 << 13) ^ a2 >>> 10) + b2;
        var d_ = ((c2 >>> 7 | c2 << 25) ^ (c2 >>> 18 | c2 << 14) ^ c2 >>> 3) + d2;
        return b_ + d_ << 0;
      }
      function compress(state, words) {
        var ch, maj, s0, s1, T1, T2;
        var [a2, b2, c2, d2, e, f2, g2, h2] = state;
        const w2 = new Uint32Array(64);
        for (let i2 = 0; i2 < 16; i2++) w2[i2] = bswap(words[i2]);
        for (let i2 = 16; i2 < 64; i2++) w2[i2] = expand(w2[i2 - 2], w2[i2 - 7], w2[i2 - 15], w2[i2 - 16]);
        for (let i2 = 0; i2 < 64; i2 += 4) round(i2);
        state[0] = state[0] + a2;
        state[1] = state[1] + b2;
        state[2] = state[2] + c2;
        state[3] = state[3] + d2;
        state[4] = state[4] + e;
        state[5] = state[5] + f2;
        state[6] = state[6] + g2;
        state[7] = state[7] + h2;
        function round(n2) {
          ch = e & f2 ^ ~e & g2;
          maj = a2 & b2 ^ a2 & c2 ^ b2 & c2;
          s0 = (a2 >>> 2 | a2 << 30) ^ (a2 >>> 13 | a2 << 19) ^ (a2 >>> 22 | a2 << 10);
          s1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
          T1 = h2 + ch + s1 + w2[n2] + K2[n2];
          T2 = s0 + maj;
          h2 = d2 + T1;
          d2 = T1 + T2;
          ch = h2 & e ^ ~h2 & f2;
          maj = d2 & a2 ^ d2 & b2 ^ a2 & b2;
          s0 = (d2 >>> 2 | d2 << 30) ^ (d2 >>> 13 | d2 << 19) ^ (d2 >>> 22 | d2 << 10);
          s1 = (h2 >>> 6 | h2 << 26) ^ (h2 >>> 11 | h2 << 21) ^ (h2 >>> 25 | h2 << 7);
          T1 = g2 + ch + s1 + w2[n2 + 1] + K2[n2 + 1];
          T2 = s0 + maj;
          g2 = c2 + T1;
          c2 = T1 + T2;
          ch = g2 & h2 ^ ~g2 & e;
          maj = c2 & d2 ^ c2 & a2 ^ d2 & a2;
          s0 = (c2 >>> 2 | c2 << 30) ^ (c2 >>> 13 | c2 << 19) ^ (c2 >>> 22 | c2 << 10);
          s1 = (g2 >>> 6 | g2 << 26) ^ (g2 >>> 11 | g2 << 21) ^ (g2 >>> 25 | g2 << 7);
          T1 = f2 + ch + s1 + w2[n2 + 2] + K2[n2 + 2];
          T2 = s0 + maj;
          f2 = b2 + T1;
          b2 = T1 + T2;
          ch = f2 & g2 ^ ~f2 & h2;
          maj = b2 & c2 ^ b2 & d2 ^ c2 & d2;
          s0 = (b2 >>> 2 | b2 << 30) ^ (b2 >>> 13 | b2 << 19) ^ (b2 >>> 22 | b2 << 10);
          s1 = (f2 >>> 6 | f2 << 26) ^ (f2 >>> 11 | f2 << 21) ^ (f2 >>> 25 | f2 << 7);
          T1 = e + ch + s1 + w2[n2 + 3] + K2[n2 + 3];
          T2 = s0 + maj;
          e = a2 + T1;
          a2 = T1 + T2;
        }
      }
      function Sha256() {
        if (!(this instanceof Sha256)) return new Sha256();
        this.buffer = new ArrayBuffer(64);
        this.bytesRead = 0;
        this.pos = 0;
        this.digestLength = SHA256_BYTES;
        this.finalised = false;
        this.load = new Uint8Array(this.buffer);
        this.words = new Uint32Array(this.buffer);
        this.state = new Uint32Array([
          1779033703,
          3144134277,
          1013904242,
          2773480762,
          1359893119,
          2600822924,
          528734635,
          1541459225
        ]);
        return this;
      }
      Sha256.prototype.update = function(input, enc2) {
        assert(this.finalised === false, "Hash instance finalised");
        var [inputBuf, len] = formatInput(input, enc2);
        var i2 = 0;
        this.bytesRead += len;
        while (len > 0) {
          this.load.set(inputBuf.subarray(i2, i2 + BLOCKSIZE - this.pos), this.pos);
          i2 += BLOCKSIZE - this.pos;
          len -= BLOCKSIZE - this.pos;
          if (len < 0) break;
          this.pos = 0;
          compress(this.state, this.words);
        }
        this.pos = this.bytesRead & 63;
        this.load.fill(0, this.pos);
        return this;
      };
      Sha256.prototype.digest = function(enc2, offset = 0) {
        assert(this.finalised === false, "Hash instance finalised");
        this.finalised = true;
        this.load.fill(0, this.pos);
        this.load[this.pos] = 128;
        if (this.pos > 55) {
          compress(this.state, this.words);
          this.words.fill(0);
          this.pos = 0;
        }
        const view = new DataView(this.buffer);
        view.setUint32(56, this.bytesRead / 2 ** 29);
        view.setUint32(60, this.bytesRead << 3);
        compress(this.state, this.words);
        const resultBuf = new Uint8Array(this.state.map(bswap).buffer);
        if (!enc2) {
          return new Uint8Array(resultBuf);
        }
        if (typeof enc2 === "string") {
          return b4a.toString(resultBuf, enc2);
        }
        assert(enc2 instanceof Uint8Array, "input must be Uint8Array or Buffer");
        assert(enc2.byteLength >= this.digestLength + offset, "input not large enough for digest");
        for (let i2 = 0; i2 < this.digestLength; i2++) {
          enc2[i2 + offset] = resultBuf[i2];
        }
        return enc2;
      };
      function HMAC(key) {
        if (!(this instanceof HMAC)) return new HMAC(key);
        this.pad = b4a.alloc(64);
        this.inner = Sha256();
        this.outer = Sha256();
        const keyhash = b4a.alloc(32);
        if (key.byteLength > 64) {
          Sha256().update(key).digest(keyhash);
          key = keyhash;
        }
        this.pad.fill(54);
        for (let i2 = 0; i2 < key.byteLength; i2++) {
          this.pad[i2] ^= key[i2];
        }
        this.inner.update(this.pad);
        this.pad.fill(92);
        for (let i2 = 0; i2 < key.byteLength; i2++) {
          this.pad[i2] ^= key[i2];
        }
        this.outer.update(this.pad);
        this.pad.fill(0);
        keyhash.fill(0);
      }
      HMAC.prototype.update = function(input, enc2) {
        this.inner.update(input, enc2);
        return this;
      };
      HMAC.prototype.digest = function(enc2, offset = 0) {
        this.outer.update(this.inner.digest());
        return this.outer.digest(enc2, offset);
      };
      Sha256.HMAC = HMAC;
      function formatInput(input, enc2) {
        var result = b4a.from(input, enc2);
        return [result, result.byteLength];
      }
      function bswap(a2) {
        var r2 = (a2 & 16711935) >>> 8 | (a2 & 16711935) << 24;
        var l2 = (a2 & 4278255360) << 8 | (a2 & 4278255360) >>> 24;
        return r2 | l2;
      }
    }
  });

  // node_modules/sha256-wasm/sha256.js
  var require_sha2562 = __commonJS({
    "node_modules/sha256-wasm/sha256.js"(exports, module) {
      var __commonJS2 = (cb, mod) => function __require2() {
        return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
      };
      var __toBinary = /* @__PURE__ */ (() => {
        var table = new Uint8Array(128);
        for (var i2 = 0; i2 < 64; i2++)
          table[i2 < 26 ? i2 + 65 : i2 < 52 ? i2 + 71 : i2 < 62 ? i2 - 4 : i2 * 4 - 205] = i2;
        return (base64) => {
          var n2 = base64.length, bytes2 = new Uint8Array((n2 - (base64[n2 - 1] == "=") - (base64[n2 - 2] == "=")) * 3 / 4 | 0);
          for (var i22 = 0, j2 = 0; i22 < n2; ) {
            var c0 = table[base64.charCodeAt(i22++)], c1 = table[base64.charCodeAt(i22++)];
            var c2 = table[base64.charCodeAt(i22++)], c3 = table[base64.charCodeAt(i22++)];
            bytes2[j2++] = c0 << 2 | c1 >> 4;
            bytes2[j2++] = c1 << 4 | c2 >> 2;
            bytes2[j2++] = c2 << 6 | c3;
          }
          return bytes2;
        };
      })();
      var require_sha2563 = __commonJS2({
        "wasm-binary:./sha256.wat"(exports2, module2) {
          module2.exports = __toBinary("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");
        }
      });
      var bytes = require_sha2563();
      var compiled = new WebAssembly.Module(bytes);
      module.exports = (imports) => {
        const instance = new WebAssembly.Instance(compiled, imports);
        return instance.exports;
      };
    }
  });

  // node_modules/sha256-wasm/index.js
  var require_sha256_wasm = __commonJS({
    "node_modules/sha256-wasm/index.js"(exports, module) {
      var assert = require_nanoassert();
      var b4a = require_browser();
      var wasm = typeof WebAssembly !== "undefined" && require_sha2562()({
        imports: {
          debug: {
            log(...args) {
              console.log(...args.map((int) => (int >>> 0).toString(16).padStart(8, "0")));
            },
            log_tee(arg) {
              console.log((arg >>> 0).toString(16).padStart(8, "0"));
              return arg;
            }
          }
        }
      });
      var head = 0;
      var freeList = [];
      module.exports = Sha256;
      var SHA256_BYTES = module.exports.SHA256_BYTES = 32;
      var INPUT_OFFSET = 40;
      var STATEBYTES = 108;
      var BLOCKSIZE = 64;
      function Sha256() {
        if (!(this instanceof Sha256)) return new Sha256();
        if (!wasm) throw new Error("WASM not loaded. Wait for Sha256.ready(cb)");
        if (!freeList.length) {
          freeList.push(head);
          head += STATEBYTES;
        }
        this.finalized = false;
        this.digestLength = SHA256_BYTES;
        this.pointer = freeList.pop();
        this.pos = 0;
        this._memory = new Uint8Array(wasm.memory.buffer);
        this._memory.fill(0, this.pointer, this.pointer + STATEBYTES);
        if (this.pointer + this.digestLength > this._memory.length) this._realloc(this.pointer + STATEBYTES);
      }
      Sha256.prototype._realloc = function(size) {
        wasm.memory.grow(Math.max(0, Math.ceil(Math.abs(size - this._memory.length) / 65536)));
        this._memory = new Uint8Array(wasm.memory.buffer);
      };
      Sha256.prototype.update = function(input, enc2) {
        assert(this.finalized === false, "Hash instance finalized");
        if (head % 4 !== 0) head += 4 - head % 4;
        assert(head % 4 === 0, "input shoud be aligned for int32");
        const [inputBuf, length] = formatInput(input, enc2);
        assert(inputBuf instanceof Uint8Array, "input must be Uint8Array or Buffer");
        if (head + length > this._memory.length) this._realloc(head + input.length);
        this._memory.fill(0, head, head + roundUp(length, BLOCKSIZE) - BLOCKSIZE);
        this._memory.set(inputBuf.subarray(0, BLOCKSIZE - this.pos), this.pointer + INPUT_OFFSET + this.pos);
        this._memory.set(inputBuf.subarray(BLOCKSIZE - this.pos), head);
        this.pos = this.pos + length & 63;
        wasm.sha256(this.pointer, head, length, 0);
        return this;
      };
      Sha256.prototype.digest = function(enc2, offset = 0) {
        assert(this.finalized === false, "Hash instance finalized");
        this.finalized = true;
        freeList.push(this.pointer);
        const paddingStart = this.pointer + INPUT_OFFSET + this.pos;
        this._memory.fill(0, paddingStart, this.pointer + INPUT_OFFSET + BLOCKSIZE);
        wasm.sha256(this.pointer, head, 0, 1);
        const resultBuf = this._memory.subarray(this.pointer, this.pointer + this.digestLength);
        if (!enc2) {
          return resultBuf;
        }
        if (typeof enc2 === "string") {
          return b4a.toString(resultBuf, enc2);
        }
        assert(enc2 instanceof Uint8Array, "output must be Uint8Array or Buffer");
        assert(
          enc2.byteLength >= this.digestLength + offset,
          "output must have at least 'SHA256_BYTES' bytes remaining"
        );
        for (let i2 = 0; i2 < this.digestLength; i2++) {
          enc2[i2 + offset] = resultBuf[i2];
        }
        return enc2;
      };
      Sha256.WASM = wasm;
      Sha256.WASM_SUPPORTED = typeof WebAssembly !== "undefined";
      Sha256.ready = function(cb) {
        if (!cb) cb = noop;
        if (!wasm) return cb(new Error("WebAssembly not supported"));
        cb();
        return Promise.resolve();
      };
      Sha256.prototype.ready = Sha256.ready;
      function HMAC(key) {
        if (!(this instanceof HMAC)) return new HMAC(key);
        this.pad = b4a.alloc(64);
        this.inner = Sha256();
        this.outer = Sha256();
        const keyhash = b4a.alloc(32);
        if (key.byteLength > 64) {
          Sha256().update(key).digest(keyhash);
          key = keyhash;
        }
        this.pad.fill(54);
        for (let i2 = 0; i2 < key.byteLength; i2++) {
          this.pad[i2] ^= key[i2];
        }
        this.inner.update(this.pad);
        this.pad.fill(92);
        for (let i2 = 0; i2 < key.byteLength; i2++) {
          this.pad[i2] ^= key[i2];
        }
        this.outer.update(this.pad);
        this.pad.fill(0);
        keyhash.fill(0);
      }
      HMAC.prototype.update = function(input, enc2) {
        this.inner.update(input, enc2);
        return this;
      };
      HMAC.prototype.digest = function(enc2, offset = 0) {
        this.outer.update(this.inner.digest());
        return this.outer.digest(enc2, offset);
      };
      Sha256.HMAC = HMAC;
      function noop() {
      }
      function formatInput(input, enc2) {
        var result = b4a.from(input, enc2);
        return [result, result.byteLength];
      }
      function roundUp(n2, base) {
        return n2 + base - 1 & -base;
      }
    }
  });

  // node_modules/sha256-universal/index.js
  var require_sha256_universal = __commonJS({
    "node_modules/sha256-universal/index.js"(exports, module) {
      var js = require_sha256();
      var wasm = require_sha256_wasm();
      var Proto = js;
      module.exports = function() {
        return new Proto();
      };
      module.exports.ready = function(cb) {
        wasm.ready(function() {
          cb();
        });
      };
      module.exports.WASM_SUPPORTED = wasm.WASM_SUPPORTED;
      module.exports.WASM_LOADED = false;
      var SHA256_BYTES = module.exports.SHA256_BYTES = 32;
      wasm.ready(function(err) {
        if (!err) {
          module.exports.WASM_LOADED = true;
          module.exports = Proto = wasm;
        }
      });
    }
  });

  // node_modules/sodium-javascript/crypto_hash_sha256.js
  var require_crypto_hash_sha256 = __commonJS({
    "node_modules/sodium-javascript/crypto_hash_sha256.js"(exports, module) {
      var sha256 = require_sha256_universal();
      var assert = require_nanoassert();
      if (new Uint16Array([1])[0] !== 1) throw new Error("Big endian architecture is not supported.");
      var crypto_hash_sha256_BYTES = 32;
      function crypto_hash_sha256(out, m2, n2) {
        assert(out.byteLength === crypto_hash_sha256_BYTES, "out must be 'crypto_hash_sha256_BYTES' bytes long");
        sha256().update(m2.subarray(0, n2)).digest(out);
        return 0;
      }
      module.exports = {
        crypto_hash_sha256,
        crypto_hash_sha256_BYTES
      };
    }
  });

  // node_modules/sodium-javascript/crypto_kdf.js
  var require_crypto_kdf = __commonJS({
    "node_modules/sodium-javascript/crypto_kdf.js"(exports, module) {
      var assert = require_nanoassert();
      var randombytes_buf = require_randombytes().randombytes_buf;
      var blake2b = require_blake2b2();
      module.exports.crypto_kdf_PRIMITIVE = "blake2b";
      module.exports.crypto_kdf_BYTES_MIN = 16;
      module.exports.crypto_kdf_BYTES_MAX = 64;
      module.exports.crypto_kdf_CONTEXTBYTES = 8;
      module.exports.crypto_kdf_KEYBYTES = 32;
      function STORE64_LE(dest, int) {
        var mul = 1;
        var i2 = 0;
        dest[0] = int & 255;
        while (++i2 < 8 && (mul *= 256)) {
          dest[i2] = int / mul & 255;
        }
      }
      module.exports.crypto_kdf_derive_from_key = function crypto_kdf_derive_from_key(subkey, subkey_id, ctx, key) {
        assert(subkey.length >= module.exports.crypto_kdf_BYTES_MIN, "subkey must be at least crypto_kdf_BYTES_MIN");
        assert(subkey_id >= 0 && subkey_id <= 9007199254740991, "subkey_id must be safe integer");
        assert(ctx.length >= module.exports.crypto_kdf_CONTEXTBYTES, "context must be at least crypto_kdf_CONTEXTBYTES");
        var ctx_padded = new Uint8Array(blake2b.PERSONALBYTES);
        var salt = new Uint8Array(blake2b.SALTBYTES);
        ctx_padded.set(ctx, 0, module.exports.crypto_kdf_CONTEXTBYTES);
        STORE64_LE(salt, subkey_id);
        var outlen = Math.min(subkey.length, module.exports.crypto_kdf_BYTES_MAX);
        blake2b(outlen, key.subarray(0, module.exports.crypto_kdf_KEYBYTES), salt, ctx_padded, true).final(subkey);
      };
      module.exports.crypto_kdf_keygen = function crypto_kdf_keygen(out) {
        assert(out.length >= module.exports.crypto_kdf_KEYBYTES, "out.length must be crypto_kdf_KEYBYTES");
        randombytes_buf(out.subarray(0, module.exports.crypto_kdf_KEYBYTES));
      };
    }
  });

  // node_modules/sodium-javascript/crypto_kx.js
  var require_crypto_kx = __commonJS({
    "node_modules/sodium-javascript/crypto_kx.js"(exports, module) {
      var { crypto_scalarmult_base } = require_crypto_scalarmult();
      var { crypto_generichash } = require_crypto_generichash();
      var { randombytes_buf } = require_randombytes();
      var assert = require_nanoassert();
      var crypto_kx_SEEDBYTES = 32;
      var crypto_kx_PUBLICKEYBYTES = 32;
      var crypto_kx_SECRETKEYBYTES = 32;
      function crypto_kx_keypair(pk, sk) {
        assert(pk.byteLength === crypto_kx_PUBLICKEYBYTES, "pk must be 'crypto_kx_PUBLICKEYBYTES' bytes");
        assert(sk.byteLength === crypto_kx_SECRETKEYBYTES, "sk must be 'crypto_kx_SECRETKEYBYTES' bytes");
        randombytes_buf(sk, crypto_kx_SECRETKEYBYTES);
        return crypto_scalarmult_base(pk, sk);
      }
      function crypto_kx_seed_keypair(pk, sk, seed) {
        assert(pk.byteLength === crypto_kx_PUBLICKEYBYTES, "pk must be 'crypto_kx_PUBLICKEYBYTES' bytes");
        assert(sk.byteLength === crypto_kx_SECRETKEYBYTES, "sk must be 'crypto_kx_SECRETKEYBYTES' bytes");
        assert(seed.byteLength === crypto_kx_SEEDBYTES, "seed must be 'crypto_kx_SEEDBYTES' bytes");
        crypto_generichash(sk, seed);
        return crypto_scalarmult_base(pk, sk);
      }
      module.exports = {
        crypto_kx_keypair,
        crypto_kx_seed_keypair,
        crypto_kx_SEEDBYTES,
        crypto_kx_SECRETKEYBYTES,
        crypto_kx_PUBLICKEYBYTES
      };
    }
  });

  // node_modules/chacha20-universal/index.js
  var require_chacha20_universal = __commonJS({
    "node_modules/chacha20-universal/index.js"(exports, module) {
      var assert = require_nanoassert();
      module.exports = Chacha20;
      var constant = [1634760805, 857760878, 2036477234, 1797285236];
      function Chacha20(nonce, key, counter) {
        assert(key.byteLength === 32);
        assert(nonce.byteLength === 8 || nonce.byteLength === 12);
        const n2 = new Uint32Array(nonce.buffer, nonce.byteOffset, nonce.byteLength / 4);
        const k2 = new Uint32Array(key.buffer, key.byteOffset, key.byteLength / 4);
        if (!counter) counter = 0;
        assert(counter < Number.MAX_SAFE_INTEGER);
        this.finalized = false;
        this.pos = 0;
        this.state = new Uint32Array(16);
        for (let i2 = 0; i2 < 4; i2++) this.state[i2] = constant[i2];
        for (let i2 = 0; i2 < 8; i2++) this.state[4 + i2] = k2[i2];
        this.state[12] = counter & 4294967295;
        if (n2.byteLength === 8) {
          this.state[13] = (counter && 18446744069414584e3) >> 32;
          this.state[14] = n2[0];
          this.state[15] = n2[1];
        } else {
          this.state[13] = n2[0];
          this.state[14] = n2[1];
          this.state[15] = n2[2];
        }
        return this;
      }
      Chacha20.prototype.update = function(output, input) {
        assert(!this.finalized, "cipher finalized.");
        assert(
          output.byteLength >= input.byteLength,
          "output cannot be shorter than input."
        );
        let len = input.length;
        let offset = this.pos % 64;
        this.pos += len;
        let j2 = 0;
        let keyStream = chacha20Block(this.state);
        while (offset > 0 && len > 0) {
          output[j2] = input[j2++] ^ keyStream[offset];
          offset = offset + 1 & 63;
          if (!offset) this.state[12]++;
          len--;
        }
        while (len > 0) {
          keyStream = chacha20Block(this.state);
          if (len < 64) {
            for (let i2 = 0; i2 < len; i2++) {
              output[j2] = input[j2++] ^ keyStream[offset++];
              offset &= 63;
            }
            return;
          }
          for (; offset < 64; ) {
            output[j2] = input[j2++] ^ keyStream[offset++];
          }
          this.state[12]++;
          offset = 0;
          len -= 64;
        }
      };
      Chacha20.prototype.final = function() {
        this.state.fill(0);
        this.pos = 0;
        this.finalized = true;
      };
      function chacha20Block(state) {
        const ws = new Uint32Array(16);
        for (let i2 = 16; i2--; ) ws[i2] = state[i2];
        for (let i2 = 0; i2 < 20; i2 += 2) {
          QR(ws, 0, 4, 8, 12);
          QR(ws, 1, 5, 9, 13);
          QR(ws, 2, 6, 10, 14);
          QR(ws, 3, 7, 11, 15);
          QR(ws, 0, 5, 10, 15);
          QR(ws, 1, 6, 11, 12);
          QR(ws, 2, 7, 8, 13);
          QR(ws, 3, 4, 9, 14);
        }
        for (let i2 = 0; i2 < 16; i2++) {
          ws[i2] += state[i2];
        }
        return new Uint8Array(ws.buffer, ws.byteOffset, ws.byteLength);
      }
      function rotl(a2, b2) {
        return a2 << b2 | a2 >>> 32 - b2;
      }
      function QR(obj, a2, b2, c2, d2) {
        obj[a2] += obj[b2];
        obj[d2] ^= obj[a2];
        obj[d2] = rotl(obj[d2], 16);
        obj[c2] += obj[d2];
        obj[b2] ^= obj[c2];
        obj[b2] = rotl(obj[b2], 12);
        obj[a2] += obj[b2];
        obj[d2] ^= obj[a2];
        obj[d2] = rotl(obj[d2], 8);
        obj[c2] += obj[d2];
        obj[b2] ^= obj[c2];
        obj[b2] = rotl(obj[b2], 7);
      }
    }
  });

  // node_modules/sodium-javascript/crypto_stream_chacha20.js
  var require_crypto_stream_chacha20 = __commonJS({
    "node_modules/sodium-javascript/crypto_stream_chacha20.js"(exports) {
      var assert = require_nanoassert();
      var Chacha20 = require_chacha20_universal();
      if (new Uint16Array([1])[0] !== 1) throw new Error("Big endian architecture is not supported.");
      exports.crypto_stream_chacha20_KEYBYTES = 32;
      exports.crypto_stream_chacha20_NONCEBYTES = 8;
      exports.crypto_stream_chacha20_MESSAGEBYTES_MAX = Number.MAX_SAFE_INTEGER;
      exports.crypto_stream_chacha20_ietf_KEYBYTES = 32;
      exports.crypto_stream_chacha20_ietf_NONCEBYTES = 12;
      exports.crypto_stream_chacha20_ietf_MESSAGEBYTES_MAX = 2 ** 32;
      exports.crypto_stream_chacha20 = function(c2, n2, k2) {
        c2.fill(0);
        exports.crypto_stream_chacha20_xor(c2, c2, n2, k2);
      };
      exports.crypto_stream_chacha20_xor = function(c2, m2, n2, k2) {
        assert(
          n2.byteLength === exports.crypto_stream_chacha20_NONCEBYTES,
          "n should be crypto_stream_chacha20_NONCEBYTES"
        );
        assert(
          k2.byteLength === exports.crypto_stream_chacha20_KEYBYTES,
          "k should be crypto_stream_chacha20_KEYBYTES"
        );
        const xor = new Chacha20(n2, k2);
        xor.update(c2, m2);
        xor.final();
      };
      exports.crypto_stream_chacha20_xor_ic = function(c2, m2, n2, ic, k2) {
        assert(
          n2.byteLength === exports.crypto_stream_chacha20_NONCEBYTES,
          "n should be crypto_stream_chacha20_NONCEBYTES"
        );
        assert(
          k2.byteLength === exports.crypto_stream_chacha20_KEYBYTES,
          "k should be crypto_stream_chacha20_KEYBYTES"
        );
        const xor = new Chacha20(n2, k2, ic);
        xor.update(c2, m2);
        xor.final();
      };
      exports.crypto_stream_chacha20_xor_instance = function(n2, k2) {
        assert(
          n2.byteLength === exports.crypto_stream_chacha20_NONCEBYTES,
          "n should be crypto_stream_chacha20_NONCEBYTES"
        );
        assert(
          k2.byteLength === exports.crypto_stream_chacha20_KEYBYTES,
          "k should be crypto_stream_chacha20_KEYBYTES"
        );
        return new Chacha20(n2, k2);
      };
      exports.crypto_stream_chacha20_ietf = function(c2, n2, k2) {
        c2.fill(0);
        exports.crypto_stream_chacha20_ietf_xor(c2, c2, n2, k2);
      };
      exports.crypto_stream_chacha20_ietf_xor = function(c2, m2, n2, k2) {
        assert(
          n2.byteLength === exports.crypto_stream_chacha20_ietf_NONCEBYTES,
          "n should be crypto_stream_chacha20_ietf_NONCEBYTES"
        );
        assert(
          k2.byteLength === exports.crypto_stream_chacha20_ietf_KEYBYTES,
          "k should be crypto_stream_chacha20_ietf_KEYBYTES"
        );
        const xor = new Chacha20(n2, k2);
        xor.update(c2, m2);
        xor.final();
      };
      exports.crypto_stream_chacha20_ietf_xor_ic = function(c2, m2, n2, ic, k2) {
        assert(
          n2.byteLength === exports.crypto_stream_chacha20_ietf_NONCEBYTES,
          "n should be crypto_stream_chacha20_ietf_NONCEBYTES"
        );
        assert(
          k2.byteLength === exports.crypto_stream_chacha20_ietf_KEYBYTES,
          "k should be crypto_stream_chacha20_ietf_KEYBYTES"
        );
        const xor = new Chacha20(n2, k2, ic);
        xor.update(c2, m2);
        xor.final();
      };
      exports.crypto_stream_chacha20_ietf_xor_instance = function(n2, k2) {
        assert(
          n2.byteLength === exports.crypto_stream_chacha20_ietf_NONCEBYTES,
          "n should be crypto_stream_chacha20_ietf_NONCEBYTES"
        );
        assert(
          k2.byteLength === exports.crypto_stream_chacha20_ietf_KEYBYTES,
          "k should be crypto_stream_chacha20_ietf_KEYBYTES"
        );
        return new Chacha20(n2, k2);
      };
    }
  });

  // node_modules/sodium-javascript/crypto_aead.js
  var require_crypto_aead = __commonJS({
    "node_modules/sodium-javascript/crypto_aead.js"(exports, module) {
      var { crypto_stream_chacha20_ietf, crypto_stream_chacha20_ietf_xor_ic } = require_crypto_stream_chacha20();
      var { crypto_verify_16 } = require_crypto_verify();
      var Poly1305 = require_poly1305();
      var assert = require_nanoassert();
      var crypto_aead_chacha20poly1305_ietf_KEYBYTES = 32;
      var crypto_aead_chacha20poly1305_ietf_NSECBYTES = 0;
      var crypto_aead_chacha20poly1305_ietf_NPUBBYTES = 12;
      var crypto_aead_chacha20poly1305_ietf_ABYTES = 16;
      var crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX = Number.MAX_SAFE_INTEGER;
      var _pad0 = new Uint8Array(16);
      function crypto_aead_chacha20poly1305_ietf_encrypt(c2, m2, ad, nsec, npub, k2) {
        if (ad === null) return crypto_aead_chacha20poly1305_ietf_encrypt(c2, m2, new Uint8Array(0), nsec, npub, k2);
        assert(
          c2.byteLength === m2.byteLength + crypto_aead_chacha20poly1305_ietf_ABYTES,
          "ciphertext should be 'crypto_aead_chacha20poly1305_ietf_ABYTES' longer than message"
        );
        assert(
          npub.byteLength === crypto_aead_chacha20poly1305_ietf_NPUBBYTES,
          "npub should be 'crypto_aead_chacha20poly1305_ietf_NPUBBYTES' long"
        );
        assert(
          k2.byteLength === crypto_aead_chacha20poly1305_ietf_KEYBYTES,
          "k should be 'crypto_aead_chacha20poly1305_ietf_KEYBYTES' long"
        );
        assert(m2.byteLength <= crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX, "message is too large");
        const ret = crypto_aead_chacha20poly1305_ietf_encrypt_detached(
          c2.subarray(0, m2.byteLength),
          c2.subarray(m2.byteLength),
          m2,
          ad,
          nsec,
          npub,
          k2
        );
        return m2.byteLength + ret;
      }
      function crypto_aead_chacha20poly1305_ietf_encrypt_detached(c2, mac, m2, ad, nsec, npub, k2) {
        if (ad === null) return crypto_aead_chacha20poly1305_ietf_encrypt_detached(c2, mac, m2, new Uint8Array(0), nsec, npub, k2);
        assert(c2.byteLength === m2.byteLength, "ciphertext should be same length than message");
        assert(
          npub.byteLength === crypto_aead_chacha20poly1305_ietf_NPUBBYTES,
          "npub should be 'crypto_aead_chacha20poly1305_ietf_NPUBBYTES' long"
        );
        assert(
          k2.byteLength === crypto_aead_chacha20poly1305_ietf_KEYBYTES,
          "k should be 'crypto_aead_chacha20poly1305_ietf_KEYBYTES' long"
        );
        assert(m2.byteLength <= crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX, "message is too large");
        assert(
          mac.byteLength <= crypto_aead_chacha20poly1305_ietf_ABYTES,
          "mac should be 'crypto_aead_chacha20poly1305_ietf_ABYTES' long"
        );
        const block0 = new Uint8Array(64);
        var slen = new Uint8Array(8);
        crypto_stream_chacha20_ietf(block0, npub, k2);
        const poly = new Poly1305(block0);
        block0.fill(0);
        poly.update(ad, 0, ad.byteLength);
        poly.update(_pad0, 0, 16 - ad.byteLength & 15);
        crypto_stream_chacha20_ietf_xor_ic(c2, m2, npub, 1, k2);
        poly.update(c2, 0, m2.byteLength);
        poly.update(_pad0, 0, 16 - m2.byteLength & 15);
        write64LE(slen, 0, ad.byteLength);
        poly.update(slen, 0, slen.byteLength);
        write64LE(slen, 0, m2.byteLength);
        poly.update(slen, 0, slen.byteLength);
        poly.finish(mac, 0);
        slen.fill(0);
        return crypto_aead_chacha20poly1305_ietf_ABYTES;
      }
      function crypto_aead_chacha20poly1305_ietf_decrypt(m2, nsec, c2, ad, npub, k2) {
        if (ad === null) return crypto_aead_chacha20poly1305_ietf_decrypt(m2, nsec, c2, new Uint8Array(0), npub, k2);
        assert(
          m2.byteLength === c2.byteLength - crypto_aead_chacha20poly1305_ietf_ABYTES,
          "message should be 'crypto_aead_chacha20poly1305_ietf_ABYTES' shorter than ciphertext"
        );
        assert(
          npub.byteLength === crypto_aead_chacha20poly1305_ietf_NPUBBYTES,
          "npub should be 'crypto_aead_chacha20poly1305_ietf_NPUBBYTES' long"
        );
        assert(
          k2.byteLength === crypto_aead_chacha20poly1305_ietf_KEYBYTES,
          "k should be 'crypto_aead_chacha20poly1305_ietf_KEYBYTES' long"
        );
        assert(m2.byteLength <= crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX, "message is too large");
        if (c2.byteLength < crypto_aead_chacha20poly1305_ietf_ABYTES) throw new Error("could not verify data");
        crypto_aead_chacha20poly1305_ietf_decrypt_detached(
          m2,
          nsec,
          c2.subarray(0, c2.byteLength - crypto_aead_chacha20poly1305_ietf_ABYTES),
          c2.subarray(c2.byteLength - crypto_aead_chacha20poly1305_ietf_ABYTES),
          ad,
          npub,
          k2
        );
        return c2.byteLength - crypto_aead_chacha20poly1305_ietf_ABYTES;
      }
      function crypto_aead_chacha20poly1305_ietf_decrypt_detached(m2, nsec, c2, mac, ad, npub, k2) {
        if (ad === null) return crypto_aead_chacha20poly1305_ietf_decrypt_detached(m2, nsec, c2, mac, new Uint8Array(0), npub, k2);
        assert(c2.byteLength === m2.byteLength, "message should be same length than ciphertext");
        assert(
          npub.byteLength === crypto_aead_chacha20poly1305_ietf_NPUBBYTES,
          "npub should be 'crypto_aead_chacha20poly1305_ietf_NPUBBYTES' long"
        );
        assert(
          k2.byteLength === crypto_aead_chacha20poly1305_ietf_KEYBYTES,
          "k should be 'crypto_aead_chacha20poly1305_ietf_KEYBYTES' long"
        );
        assert(m2.byteLength <= crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX, "message is too large");
        assert(
          mac.byteLength <= crypto_aead_chacha20poly1305_ietf_ABYTES,
          "mac should be 'crypto_aead_chacha20poly1305_ietf_ABYTES' long"
        );
        const block0 = new Uint8Array(64);
        const slen = new Uint8Array(8);
        const computed_mac = new Uint8Array(crypto_aead_chacha20poly1305_ietf_ABYTES);
        crypto_stream_chacha20_ietf(block0, npub, k2);
        const poly = new Poly1305(block0);
        block0.fill(0);
        poly.update(ad, 0, ad.byteLength);
        poly.update(_pad0, 0, 16 - ad.byteLength & 15);
        const mlen = c2.byteLength;
        poly.update(c2, 0, mlen);
        poly.update(_pad0, 0, 16 - mlen & 15);
        write64LE(slen, 0, ad.byteLength);
        poly.update(slen, 0, slen.byteLength);
        write64LE(slen, 0, mlen);
        poly.update(slen, 0, slen.byteLength);
        poly.finish(computed_mac, 0);
        assert(computed_mac.byteLength === 16);
        const ret = crypto_verify_16(computed_mac, 0, mac, 0);
        computed_mac.fill(0);
        slen.fill(0);
        if (!ret) {
          m2.fill(0);
          throw new Error("could not verify data");
        }
        crypto_stream_chacha20_ietf_xor_ic(m2, c2, npub, 1, k2);
      }
      function write64LE(buf, offset, int) {
        buf.fill(0, 0, 8);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        view.setUint32(offset, int & 4294967295, true);
        view.setUint32(offset + 4, int / 2 ** 32 & 4294967295, true);
      }
      module.exports = {
        crypto_aead_chacha20poly1305_ietf_encrypt,
        crypto_aead_chacha20poly1305_ietf_encrypt_detached,
        crypto_aead_chacha20poly1305_ietf_decrypt,
        crypto_aead_chacha20poly1305_ietf_decrypt_detached,
        crypto_aead_chacha20poly1305_ietf_ABYTES,
        crypto_aead_chacha20poly1305_ietf_KEYBYTES,
        crypto_aead_chacha20poly1305_ietf_NPUBBYTES,
        crypto_aead_chacha20poly1305_ietf_NSECBYTES,
        crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX
      };
    }
  });

  // node_modules/sodium-javascript/internal/hchacha20.js
  var require_hchacha20 = __commonJS({
    "node_modules/sodium-javascript/internal/hchacha20.js"(exports, module) {
      var { sodium_malloc } = require_memory();
      var assert = require_nanoassert();
      if (new Uint16Array([1])[0] !== 1) throw new Error("Big endian architecture is not supported.");
      var crypto_core_hchacha20_OUTPUTBYTES = 32;
      var crypto_core_hchacha20_INPUTBYTES = 16;
      var crypto_core_hchacha20_KEYBYTES = 32;
      var crypto_core_hchacha20_CONSTBYTES = 16;
      function ROTL32(x2, b2) {
        x2 &= 4294967295;
        b2 &= 4294967295;
        return x2 << b2 | x2 >>> 32 - b2;
      }
      function LOAD32_LE(src, offset) {
        assert(src instanceof Uint8Array, "src not byte array");
        let w2 = src[offset];
        w2 |= src[offset + 1] << 8;
        w2 |= src[offset + 2] << 16;
        w2 |= src[offset + 3] << 24;
        return w2;
      }
      function STORE32_LE(dest, int, offset) {
        assert(dest instanceof Uint8Array, "dest not byte array");
        var mul = 1;
        var i2 = 0;
        dest[offset] = int & 255;
        while (++i2 < 4 && (mul *= 256)) {
          dest[offset + i2] = int / mul & 255;
        }
      }
      function QUARTERROUND(l2, A3, B2, C2, D2) {
        l2[A3] += l2[B2];
        l2[D2] = ROTL32(l2[D2] ^ l2[A3], 16);
        l2[C2] += l2[D2];
        l2[B2] = ROTL32(l2[B2] ^ l2[C2], 12);
        l2[A3] += l2[B2];
        l2[D2] = ROTL32(l2[D2] ^ l2[A3], 8);
        l2[C2] += l2[D2];
        l2[B2] = ROTL32(l2[B2] ^ l2[C2], 7);
      }
      function crypto_core_hchacha20(out, _in, k2, c2) {
        assert(out instanceof Uint8Array && out.length === 32, "out is not an array of 32 bytes");
        assert(k2 instanceof Uint8Array && k2.length === 32, "k is not an array of 32 bytes");
        assert(c2 === null || c2 instanceof Uint8Array && c2.length === 16, "c is not null or an array of 16 bytes");
        let i2 = 0;
        const x2 = new Uint32Array(16);
        if (!c2) {
          x2[0] = 1634760805;
          x2[1] = 857760878;
          x2[2] = 2036477234;
          x2[3] = 1797285236;
        } else {
          x2[0] = LOAD32_LE(c2, 0);
          x2[1] = LOAD32_LE(c2, 4);
          x2[2] = LOAD32_LE(c2, 8);
          x2[3] = LOAD32_LE(c2, 12);
        }
        x2[4] = LOAD32_LE(k2, 0);
        x2[5] = LOAD32_LE(k2, 4);
        x2[6] = LOAD32_LE(k2, 8);
        x2[7] = LOAD32_LE(k2, 12);
        x2[8] = LOAD32_LE(k2, 16);
        x2[9] = LOAD32_LE(k2, 20);
        x2[10] = LOAD32_LE(k2, 24);
        x2[11] = LOAD32_LE(k2, 28);
        x2[12] = LOAD32_LE(_in, 0);
        x2[13] = LOAD32_LE(_in, 4);
        x2[14] = LOAD32_LE(_in, 8);
        x2[15] = LOAD32_LE(_in, 12);
        for (i2 = 0; i2 < 10; i2++) {
          QUARTERROUND(x2, 0, 4, 8, 12);
          QUARTERROUND(x2, 1, 5, 9, 13);
          QUARTERROUND(x2, 2, 6, 10, 14);
          QUARTERROUND(x2, 3, 7, 11, 15);
          QUARTERROUND(x2, 0, 5, 10, 15);
          QUARTERROUND(x2, 1, 6, 11, 12);
          QUARTERROUND(x2, 2, 7, 8, 13);
          QUARTERROUND(x2, 3, 4, 9, 14);
        }
        STORE32_LE(out, x2[0], 0);
        STORE32_LE(out, x2[1], 4);
        STORE32_LE(out, x2[2], 8);
        STORE32_LE(out, x2[3], 12);
        STORE32_LE(out, x2[12], 16);
        STORE32_LE(out, x2[13], 20);
        STORE32_LE(out, x2[14], 24);
        STORE32_LE(out, x2[15], 28);
        return 0;
      }
      function crypto_core_hchacha20_outputbytes() {
        return crypto_core_hchacha20_OUTPUTBYTES;
      }
      function crypto_core_hchacha20_inputbytes() {
        return crypto_core_hchacha20_INPUTBYTES;
      }
      function crypto_core_hchacha20_keybytes() {
        return crypto_core_hchacha20_KEYBYTES;
      }
      function crypto_core_hchacha20_constbytes() {
        return crypto_core_hchacha20_CONSTBYTES;
      }
      module.exports = {
        crypto_core_hchacha20_INPUTBYTES,
        LOAD32_LE,
        STORE32_LE,
        QUARTERROUND,
        crypto_core_hchacha20,
        crypto_core_hchacha20_outputbytes,
        crypto_core_hchacha20_inputbytes,
        crypto_core_hchacha20_keybytes,
        crypto_core_hchacha20_constbytes
      };
    }
  });

  // node_modules/sodium-javascript/crypto_secretstream.js
  var require_crypto_secretstream = __commonJS({
    "node_modules/sodium-javascript/crypto_secretstream.js"(exports, module) {
      var assert = require_nanoassert();
      var { randombytes_buf } = require_randombytes();
      var {
        crypto_stream_chacha20_ietf,
        crypto_stream_chacha20_ietf_xor,
        crypto_stream_chacha20_ietf_xor_ic,
        crypto_stream_chacha20_ietf_KEYBYTES
      } = require_crypto_stream_chacha20();
      var { crypto_core_hchacha20, crypto_core_hchacha20_INPUTBYTES } = require_hchacha20();
      var Poly1305 = require_poly1305();
      var { sodium_increment, sodium_is_zero, sodium_memcmp } = require_helpers();
      var crypto_onetimeauth_poly1305_BYTES = 16;
      var crypto_secretstream_xchacha20poly1305_COUNTERBYTES = 4;
      var crypto_secretstream_xchacha20poly1305_INONCEBYTES = 8;
      var crypto_aead_xchacha20poly1305_ietf_KEYBYTES = 32;
      var crypto_secretstream_xchacha20poly1305_KEYBYTES = crypto_aead_xchacha20poly1305_ietf_KEYBYTES;
      var crypto_aead_xchacha20poly1305_ietf_NPUBBYTES = 24;
      var crypto_secretstream_xchacha20poly1305_HEADERBYTES = crypto_aead_xchacha20poly1305_ietf_NPUBBYTES;
      var crypto_aead_xchacha20poly1305_ietf_ABYTES = 16;
      var crypto_secretstream_xchacha20poly1305_ABYTES = 1 + crypto_aead_xchacha20poly1305_ietf_ABYTES;
      var crypto_secretstream_xchacha20poly1305_MESSAGEBYTES_MAX = Number.MAX_SAFE_INTEGER;
      var crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX = Number.MAX_SAFE_INTEGER;
      var crypto_secretstream_xchacha20poly1305_TAGBYTES = 1;
      var crypto_secretstream_xchacha20poly1305_TAG_MESSAGE = new Uint8Array([0]);
      var crypto_secretstream_xchacha20poly1305_TAG_PUSH = new Uint8Array([1]);
      var crypto_secretstream_xchacha20poly1305_TAG_REKEY = new Uint8Array([2]);
      var crypto_secretstream_xchacha20poly1305_TAG_FINAL = new Uint8Array([crypto_secretstream_xchacha20poly1305_TAG_PUSH | crypto_secretstream_xchacha20poly1305_TAG_REKEY]);
      var crypto_secretstream_xchacha20poly1305_STATEBYTES = crypto_secretstream_xchacha20poly1305_KEYBYTES + crypto_secretstream_xchacha20poly1305_INONCEBYTES + crypto_secretstream_xchacha20poly1305_COUNTERBYTES + 8;
      var KEY_OFFSET = 0;
      var NONCE_OFFSET = crypto_secretstream_xchacha20poly1305_KEYBYTES;
      var PAD_OFFSET = NONCE_OFFSET + crypto_secretstream_xchacha20poly1305_INONCEBYTES + crypto_secretstream_xchacha20poly1305_COUNTERBYTES;
      var _pad0 = new Uint8Array(16);
      function STORE64_LE(dest, int) {
        let mul = 1;
        let i2 = 0;
        dest[0] = int & 255;
        while (++i2 < 8 && (mul *= 256)) {
          dest[i2] = int / mul & 255;
        }
      }
      function crypto_secretstream_xchacha20poly1305_counter_reset(state) {
        assert(
          state.byteLength === crypto_secretstream_xchacha20poly1305_STATEBYTES,
          "state is should be crypto_secretstream_xchacha20poly1305_STATEBYTES long"
        );
        const nonce = state.subarray(NONCE_OFFSET, PAD_OFFSET);
        for (let i2 = 0; i2 < crypto_secretstream_xchacha20poly1305_COUNTERBYTES; i2++) {
          nonce[i2] = 0;
        }
        nonce[0] = 1;
      }
      function crypto_secretstream_xchacha20poly1305_keygen(k2) {
        assert(k2.length === crypto_secretstream_xchacha20poly1305_KEYBYTES);
        randombytes_buf(k2);
      }
      function crypto_secretstream_xchacha20poly1305_init_push(state, out, key) {
        assert(
          state.byteLength === crypto_secretstream_xchacha20poly1305_STATEBYTES,
          "state is should be crypto_secretstream_xchacha20poly1305_STATEBYTES long"
        );
        assert(out instanceof Uint8Array && out.length === crypto_secretstream_xchacha20poly1305_HEADERBYTES, "out not byte array of length crypto_secretstream_xchacha20poly1305_HEADERBYTES");
        assert(key instanceof Uint8Array && key.length === crypto_secretstream_xchacha20poly1305_KEYBYTES, "key not byte array of length crypto_secretstream_xchacha20poly1305_KEYBYTES");
        const k2 = state.subarray(KEY_OFFSET, NONCE_OFFSET);
        const nonce = state.subarray(NONCE_OFFSET, PAD_OFFSET);
        const pad = state.subarray(PAD_OFFSET);
        randombytes_buf(out, crypto_secretstream_xchacha20poly1305_HEADERBYTES);
        crypto_core_hchacha20(k2, out, key, null);
        crypto_secretstream_xchacha20poly1305_counter_reset(state);
        for (let i2 = 0; i2 < crypto_secretstream_xchacha20poly1305_INONCEBYTES; i2++) {
          nonce[i2 + crypto_secretstream_xchacha20poly1305_COUNTERBYTES] = out[i2 + crypto_core_hchacha20_INPUTBYTES];
        }
        pad.fill(0);
      }
      function crypto_secretstream_xchacha20poly1305_init_pull(state, _in, key) {
        assert(
          state.byteLength === crypto_secretstream_xchacha20poly1305_STATEBYTES,
          "state is should be crypto_secretstream_xchacha20poly1305_STATEBYTES long"
        );
        assert(
          _in instanceof Uint8Array && _in.length === crypto_secretstream_xchacha20poly1305_HEADERBYTES,
          "_in not byte array of length crypto_secretstream_xchacha20poly1305_HEADERBYTES"
        );
        assert(
          key instanceof Uint8Array && key.length === crypto_secretstream_xchacha20poly1305_KEYBYTES,
          "key not byte array of length crypto_secretstream_xchacha20poly1305_KEYBYTES"
        );
        const k2 = state.subarray(KEY_OFFSET, NONCE_OFFSET);
        const nonce = state.subarray(NONCE_OFFSET, PAD_OFFSET);
        const pad = state.subarray(PAD_OFFSET);
        crypto_core_hchacha20(k2, _in, key, null);
        crypto_secretstream_xchacha20poly1305_counter_reset(state);
        for (let i2 = 0; i2 < crypto_secretstream_xchacha20poly1305_INONCEBYTES; i2++) {
          nonce[i2 + crypto_secretstream_xchacha20poly1305_COUNTERBYTES] = _in[i2 + crypto_core_hchacha20_INPUTBYTES];
        }
        pad.fill(0);
      }
      function crypto_secretstream_xchacha20poly1305_rekey(state) {
        assert(
          state.byteLength === crypto_secretstream_xchacha20poly1305_STATEBYTES,
          "state is should be crypto_secretstream_xchacha20poly1305_STATEBYTES long"
        );
        const k2 = state.subarray(KEY_OFFSET, NONCE_OFFSET);
        const nonce = state.subarray(NONCE_OFFSET, PAD_OFFSET);
        const new_key_and_inonce = new Uint8Array(
          crypto_stream_chacha20_ietf_KEYBYTES + crypto_secretstream_xchacha20poly1305_INONCEBYTES
        );
        let i2;
        for (i2 = 0; i2 < crypto_stream_chacha20_ietf_KEYBYTES; i2++) {
          new_key_and_inonce[i2] = k2[i2];
        }
        for (i2 = 0; i2 < crypto_secretstream_xchacha20poly1305_INONCEBYTES; i2++) {
          new_key_and_inonce[crypto_stream_chacha20_ietf_KEYBYTES + i2] = nonce[crypto_secretstream_xchacha20poly1305_COUNTERBYTES + i2];
        }
        crypto_stream_chacha20_ietf_xor(new_key_and_inonce, new_key_and_inonce, nonce, k2);
        for (i2 = 0; i2 < crypto_stream_chacha20_ietf_KEYBYTES; i2++) {
          k2[i2] = new_key_and_inonce[i2];
        }
        for (i2 = 0; i2 < crypto_secretstream_xchacha20poly1305_INONCEBYTES; i2++) {
          nonce[crypto_secretstream_xchacha20poly1305_COUNTERBYTES + i2] = new_key_and_inonce[crypto_stream_chacha20_ietf_KEYBYTES + i2];
        }
        crypto_secretstream_xchacha20poly1305_counter_reset(state);
      }
      function crypto_secretstream_xchacha20poly1305_push(state, out, m2, ad, tag) {
        assert(
          state.byteLength === crypto_secretstream_xchacha20poly1305_STATEBYTES,
          "state is should be crypto_secretstream_xchacha20poly1305_STATEBYTES long"
        );
        if (!ad) ad = new Uint8Array(0);
        const k2 = state.subarray(KEY_OFFSET, NONCE_OFFSET);
        const nonce = state.subarray(NONCE_OFFSET, PAD_OFFSET);
        const block = new Uint8Array(64);
        const slen = new Uint8Array(8);
        assert(crypto_secretstream_xchacha20poly1305_MESSAGEBYTES_MAX <= crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX);
        crypto_stream_chacha20_ietf(block, nonce, k2);
        const poly = new Poly1305(block);
        block.fill(0);
        poly.update(ad, 0, ad.byteLength);
        poly.update(_pad0, 0, 16 - ad.byteLength & 15);
        block[0] = tag[0];
        crypto_stream_chacha20_ietf_xor_ic(block, block, nonce, 1, k2);
        poly.update(block, 0, block.byteLength);
        out[0] = block[0];
        const c2 = out.subarray(1, out.byteLength);
        crypto_stream_chacha20_ietf_xor_ic(c2, m2, nonce, 2, k2);
        poly.update(c2, 0, m2.byteLength);
        poly.update(_pad0, 0, 16 - block.byteLength + m2.byteLength & 15);
        STORE64_LE(slen, ad.byteLength);
        poly.update(slen, 0, slen.byteLength);
        STORE64_LE(slen, block.byteLength + m2.byteLength);
        poly.update(slen, 0, slen.byteLength);
        const mac = out.subarray(1 + m2.byteLength, out.byteLength);
        poly.finish(mac, 0);
        assert(crypto_onetimeauth_poly1305_BYTES >= crypto_secretstream_xchacha20poly1305_INONCEBYTES);
        xor_buf(
          nonce.subarray(crypto_secretstream_xchacha20poly1305_COUNTERBYTES, nonce.length),
          mac,
          crypto_secretstream_xchacha20poly1305_INONCEBYTES
        );
        sodium_increment(nonce);
        if ((tag[0] & crypto_secretstream_xchacha20poly1305_TAG_REKEY) !== 0 || sodium_is_zero(nonce.subarray(0, crypto_secretstream_xchacha20poly1305_COUNTERBYTES))) {
          crypto_secretstream_xchacha20poly1305_rekey(state);
        }
        return crypto_secretstream_xchacha20poly1305_ABYTES + m2.byteLength;
      }
      function crypto_secretstream_xchacha20poly1305_pull(state, m2, tag, _in, ad) {
        assert(
          state.byteLength === crypto_secretstream_xchacha20poly1305_STATEBYTES,
          "state is should be crypto_secretstream_xchacha20poly1305_STATEBYTES long"
        );
        if (!ad) ad = new Uint8Array(0);
        const k2 = state.subarray(KEY_OFFSET, NONCE_OFFSET);
        const nonce = state.subarray(NONCE_OFFSET, PAD_OFFSET);
        const block = new Uint8Array(64);
        const slen = new Uint8Array(8);
        const mac = new Uint8Array(crypto_onetimeauth_poly1305_BYTES);
        assert(
          _in.byteLength >= crypto_secretstream_xchacha20poly1305_ABYTES,
          "ciphertext is too short."
        );
        const mlen = _in.byteLength - crypto_secretstream_xchacha20poly1305_ABYTES;
        crypto_stream_chacha20_ietf(block, nonce, k2);
        const poly = new Poly1305(block);
        block.fill(0);
        poly.update(ad, 0, ad.byteLength);
        poly.update(_pad0, 0, 16 - ad.byteLength & 15);
        block.fill(0);
        block[0] = _in[0];
        crypto_stream_chacha20_ietf_xor_ic(block, block, nonce, 1, k2);
        tag[0] = block[0];
        block[0] = _in[0];
        poly.update(block, 0, block.byteLength);
        const c2 = _in.subarray(1, _in.length);
        poly.update(c2, 0, mlen);
        poly.update(_pad0, 0, 16 - block.byteLength + mlen & 15);
        STORE64_LE(slen, ad.byteLength);
        poly.update(slen, 0, slen.byteLength);
        STORE64_LE(slen, block.byteLength + m2.byteLength);
        poly.update(slen, 0, slen.byteLength);
        poly.finish(mac, 0);
        const stored_mac = _in.subarray(1 + mlen, _in.length);
        if (!sodium_memcmp(mac, stored_mac)) {
          mac.fill(0);
          throw new Error("MAC could not be verified.");
        }
        crypto_stream_chacha20_ietf_xor_ic(m2, c2.subarray(0, m2.length), nonce, 2, k2);
        xor_buf(
          nonce.subarray(crypto_secretstream_xchacha20poly1305_COUNTERBYTES, nonce.length),
          mac,
          crypto_secretstream_xchacha20poly1305_INONCEBYTES
        );
        sodium_increment(nonce);
        if ((tag & crypto_secretstream_xchacha20poly1305_TAG_REKEY) !== 0 || sodium_is_zero(nonce.subarray(0, crypto_secretstream_xchacha20poly1305_COUNTERBYTES))) {
          crypto_secretstream_xchacha20poly1305_rekey(state);
        }
        return mlen;
      }
      function xor_buf(out, _in, n2) {
        for (let i2 = 0; i2 < n2; i2++) {
          out[i2] ^= _in[i2];
        }
      }
      module.exports = {
        crypto_secretstream_xchacha20poly1305_keygen,
        crypto_secretstream_xchacha20poly1305_init_push,
        crypto_secretstream_xchacha20poly1305_init_pull,
        crypto_secretstream_xchacha20poly1305_rekey,
        crypto_secretstream_xchacha20poly1305_push,
        crypto_secretstream_xchacha20poly1305_pull,
        crypto_secretstream_xchacha20poly1305_STATEBYTES,
        crypto_secretstream_xchacha20poly1305_ABYTES,
        crypto_secretstream_xchacha20poly1305_HEADERBYTES,
        crypto_secretstream_xchacha20poly1305_KEYBYTES,
        crypto_secretstream_xchacha20poly1305_MESSAGEBYTES_MAX,
        crypto_secretstream_xchacha20poly1305_TAGBYTES,
        crypto_secretstream_xchacha20poly1305_TAG_MESSAGE,
        crypto_secretstream_xchacha20poly1305_TAG_PUSH,
        crypto_secretstream_xchacha20poly1305_TAG_REKEY,
        crypto_secretstream_xchacha20poly1305_TAG_FINAL
      };
    }
  });

  // node_modules/siphash24/siphash24.js
  var require_siphash24 = __commonJS({
    "node_modules/siphash24/siphash24.js"(exports, module) {
      var __commonJS2 = (cb, mod) => function __require2() {
        return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
      };
      var __toBinary = /* @__PURE__ */ (() => {
        var table = new Uint8Array(128);
        for (var i2 = 0; i2 < 64; i2++)
          table[i2 < 26 ? i2 + 65 : i2 < 52 ? i2 + 71 : i2 < 62 ? i2 - 4 : i2 * 4 - 205] = i2;
        return (base64) => {
          var n2 = base64.length, bytes2 = new Uint8Array((n2 - (base64[n2 - 1] == "=") - (base64[n2 - 2] == "=")) * 3 / 4 | 0);
          for (var i22 = 0, j2 = 0; i22 < n2; ) {
            var c0 = table[base64.charCodeAt(i22++)], c1 = table[base64.charCodeAt(i22++)];
            var c2 = table[base64.charCodeAt(i22++)], c3 = table[base64.charCodeAt(i22++)];
            bytes2[j2++] = c0 << 2 | c1 >> 4;
            bytes2[j2++] = c1 << 4 | c2 >> 2;
            bytes2[j2++] = c2 << 6 | c3;
          }
          return bytes2;
        };
      })();
      var require_siphash243 = __commonJS2({
        "wasm-binary:./siphash24.wat"(exports2, module2) {
          module2.exports = __toBinary("AGFzbQEAAAABBgFgAn9/AAMCAQAFBQEBCpBOBxQCBm1lbW9yeQIAB3NpcGhhc2gAAArdCAHaCAIIfgJ/QvXKzYPXrNu38wAhAkLt3pHzlszct+QAIQNC4eSV89bs2bzsACEEQvPK0cunjNmy9AAhBUEIKQMAIQdBECkDACEIIAGtQjiGIQYgAUEHcSELIAAgAWogC2shCiAFIAiFIQUgBCAHhSEEIAMgCIUhAyACIAeFIQICQANAIAAgCkYNASAAKQMAIQkgBSAJhSEFIAIgA3whAiADQg2JIQMgAyAChSEDIAJCIIkhAiAEIAV8IQQgBUIQiSEFIAUgBIUhBSACIAV8IQIgBUIViSEFIAUgAoUhBSAEIAN8IQQgA0IRiSEDIAMgBIUhAyAEQiCJIQQgAiADfCECIANCDYkhAyADIAKFIQMgAkIgiSECIAQgBXwhBCAFQhCJIQUgBSAEhSEFIAIgBXwhAiAFQhWJIQUgBSAChSEFIAQgA3whBCADQhGJIQMgAyAEhSEDIARCIIkhBCACIAmFIQIgAEEIaiEADAALCwJAAkACQAJAAkACQAJAAkAgCw4HBwYFBAMCAQALIAYgADEABkIwhoQhBgsgBiAAMQAFQiiGhCEGCyAGIAAxAARCIIaEIQYLIAYgADEAA0IYhoQhBgsgBiAAMQACQhCGhCEGCyAGIAAxAAFCCIaEIQYLIAYgADEAAIQhBgsgBSAGhSEFIAIgA3whAiADQg2JIQMgAyAChSEDIAJCIIkhAiAEIAV8IQQgBUIQiSEFIAUgBIUhBSACIAV8IQIgBUIViSEFIAUgAoUhBSAEIAN8IQQgA0IRiSEDIAMgBIUhAyAEQiCJIQQgAiADfCECIANCDYkhAyADIAKFIQMgAkIgiSECIAQgBXwhBCAFQhCJIQUgBSAEhSEFIAIgBXwhAiAFQhWJIQUgBSAChSEFIAQgA3whBCADQhGJIQMgAyAEhSEDIARCIIkhBCACIAaFIQIgBEL/AYUhBCACIAN8IQIgA0INiSEDIAMgAoUhAyACQiCJIQIgBCAFfCEEIAVCEIkhBSAFIASFIQUgAiAFfCECIAVCFYkhBSAFIAKFIQUgBCADfCEEIANCEYkhAyADIASFIQMgBEIgiSEEIAIgA3whAiADQg2JIQMgAyAChSEDIAJCIIkhAiAEIAV8IQQgBUIQiSEFIAUgBIUhBSACIAV8IQIgBUIViSEFIAUgAoUhBSAEIAN8IQQgA0IRiSEDIAMgBIUhAyAEQiCJIQQgAiADfCECIANCDYkhAyADIAKFIQMgAkIgiSECIAQgBXwhBCAFQhCJIQUgBSAEhSEFIAIgBXwhAiAFQhWJIQUgBSAChSEFIAQgA3whBCADQhGJIQMgAyAEhSEDIARCIIkhBCACIAN8IQIgA0INiSEDIAMgAoUhAyACQiCJIQIgBCAFfCEEIAVCEIkhBSAFIASFIQUgAiAFfCECIAVCFYkhBSAFIAKFIQUgBCADfCEEIANCEYkhAyADIASFIQMgBEIgiSEEQQAgAiADIAQgBYWFhTcDAAs=");
        }
      });
      var bytes = require_siphash243();
      var compiled = new WebAssembly.Module(bytes);
      module.exports = (imports) => {
        const instance = new WebAssembly.Instance(compiled, imports);
        return instance.exports;
      };
    }
  });

  // node_modules/siphash24/fallback.js
  var require_fallback = __commonJS({
    "node_modules/siphash24/fallback.js"(exports, module) {
      module.exports = fallback;
      function _add(a2, b2) {
        var rl = a2.l + b2.l;
        var a22 = {
          h: a2.h + b2.h + (rl / 2 >>> 31) >>> 0,
          l: rl >>> 0
        };
        a2.h = a22.h;
        a2.l = a22.l;
      }
      function _xor(a2, b2) {
        a2.h ^= b2.h;
        a2.h >>>= 0;
        a2.l ^= b2.l;
        a2.l >>>= 0;
      }
      function _rotl(a2, n2) {
        var a22 = {
          h: a2.h << n2 | a2.l >>> 32 - n2,
          l: a2.l << n2 | a2.h >>> 32 - n2
        };
        a2.h = a22.h;
        a2.l = a22.l;
      }
      function _rotl32(a2) {
        var al = a2.l;
        a2.l = a2.h;
        a2.h = al;
      }
      function _compress(v0, v1, v2, v3) {
        _add(v0, v1);
        _add(v2, v3);
        _rotl(v1, 13);
        _rotl(v3, 16);
        _xor(v1, v0);
        _xor(v3, v2);
        _rotl32(v0);
        _add(v2, v1);
        _add(v0, v3);
        _rotl(v1, 17);
        _rotl(v3, 21);
        _xor(v1, v2);
        _xor(v3, v0);
        _rotl32(v2);
      }
      function _get_int(a2, offset) {
        return a2[offset + 3] << 24 | a2[offset + 2] << 16 | a2[offset + 1] << 8 | a2[offset];
      }
      function fallback(out, m2, key) {
        var k0 = { h: _get_int(key, 4), l: _get_int(key, 0) };
        var k1 = { h: _get_int(key, 12), l: _get_int(key, 8) };
        var v0 = { h: k0.h, l: k0.l };
        var v2 = k0;
        var v1 = { h: k1.h, l: k1.l };
        var v3 = k1;
        var mi;
        var mp = 0;
        var ml = m2.length;
        var ml7 = ml - 7;
        var buf = new Uint8Array(new ArrayBuffer(8));
        _xor(v0, { h: 1936682341, l: 1886610805 });
        _xor(v1, { h: 1685025377, l: 1852075885 });
        _xor(v2, { h: 1819895653, l: 1852142177 });
        _xor(v3, { h: 1952801890, l: 2037671283 });
        while (mp < ml7) {
          mi = { h: _get_int(m2, mp + 4), l: _get_int(m2, mp) };
          _xor(v3, mi);
          _compress(v0, v1, v2, v3);
          _compress(v0, v1, v2, v3);
          _xor(v0, mi);
          mp += 8;
        }
        buf[7] = ml;
        var ic = 0;
        while (mp < ml) {
          buf[ic++] = m2[mp++];
        }
        while (ic < 7) {
          buf[ic++] = 0;
        }
        mi = {
          h: buf[7] << 24 | buf[6] << 16 | buf[5] << 8 | buf[4],
          l: buf[3] << 24 | buf[2] << 16 | buf[1] << 8 | buf[0]
        };
        _xor(v3, mi);
        _compress(v0, v1, v2, v3);
        _compress(v0, v1, v2, v3);
        _xor(v0, mi);
        _xor(v2, { h: 0, l: 255 });
        _compress(v0, v1, v2, v3);
        _compress(v0, v1, v2, v3);
        _compress(v0, v1, v2, v3);
        _compress(v0, v1, v2, v3);
        var h2 = v0;
        _xor(h2, v1);
        _xor(h2, v2);
        _xor(h2, v3);
        out[0] = h2.l & 255;
        out[1] = h2.l >> 8 & 255;
        out[2] = h2.l >> 16 & 255;
        out[3] = h2.l >> 24 & 255;
        out[4] = h2.h & 255;
        out[5] = h2.h >> 8 & 255;
        out[6] = h2.h >> 16 & 255;
        out[7] = h2.h >> 24 & 255;
      }
    }
  });

  // node_modules/siphash24/index.js
  var require_siphash242 = __commonJS({
    "node_modules/siphash24/index.js"(exports, module) {
      var assert = require_nanoassert();
      var wasm = typeof WebAssembly !== "undefined" && require_siphash24()();
      var fallback = require_fallback();
      module.exports = siphash24;
      var BYTES = siphash24.BYTES = 8;
      var KEYBYTES = siphash24.KEYBYTES = 16;
      siphash24.WASM_SUPPORTED = !!wasm;
      siphash24.WASM_LOADED = !!wasm;
      var memory = new Uint8Array(wasm ? wasm.memory.buffer : 0);
      function siphash24(data, key, out, noAssert) {
        if (!out) out = new Uint8Array(8);
        if (noAssert !== true) {
          assert(out.length >= BYTES, "output must be at least " + BYTES);
          assert(key.length >= KEYBYTES, "key must be at least " + KEYBYTES);
        }
        if (wasm) {
          if (data.length + 24 > memory.length) realloc(data.length + 24);
          memory.set(key, 8);
          memory.set(data, 24);
          wasm.siphash(24, data.length);
          out.set(memory.subarray(0, 8));
        } else {
          fallback(out, data, key);
        }
        return out;
      }
      function realloc(size) {
        wasm.memory.grow(Math.max(0, Math.ceil(Math.abs(size - memory.length) / 65536)));
        memory = new Uint8Array(wasm.memory.buffer);
      }
    }
  });

  // node_modules/sodium-javascript/crypto_shorthash.js
  var require_crypto_shorthash = __commonJS({
    "node_modules/sodium-javascript/crypto_shorthash.js"(exports) {
      var siphash = require_siphash242();
      if (new Uint16Array([1])[0] !== 1) throw new Error("Big endian architecture is not supported.");
      exports.crypto_shorthash_PRIMITIVE = "siphash24";
      exports.crypto_shorthash_BYTES = siphash.BYTES;
      exports.crypto_shorthash_KEYBYTES = siphash.KEYBYTES;
      exports.crypto_shorthash_WASM_SUPPORTED = siphash.WASM_SUPPORTED;
      exports.crypto_shorthash_WASM_LOADED = siphash.WASM_LOADED;
      exports.crypto_shorthash = shorthash;
      function shorthash(out, data, key, noAssert) {
        siphash(data, key, out, noAssert);
      }
    }
  });

  // node_modules/sodium-javascript/crypto_sign.js
  var require_crypto_sign = __commonJS({
    "node_modules/sodium-javascript/crypto_sign.js"(exports, module) {
      var { crypto_verify_32 } = require_crypto_verify();
      var { crypto_hash } = require_crypto_hash();
      var {
        gf,
        gf0,
        gf1,
        D: D2,
        D2: D22,
        X: X2,
        Y: Y2,
        I: I2,
        A: A3,
        Z: Z2,
        M: M2,
        S: S2,
        sel25519,
        pack25519,
        inv25519,
        unpack25519
      } = require_ed25519();
      var { randombytes } = require_randombytes();
      var { crypto_scalarmult_BYTES } = require_crypto_scalarmult();
      var { crypto_hash_sha512_BYTES } = require_crypto_hash();
      var assert = require_nanoassert();
      var crypto_sign_ed25519_PUBLICKEYBYTES = 32;
      var crypto_sign_ed25519_SECRETKEYBYTES = 64;
      var crypto_sign_ed25519_SEEDBYTES = 32;
      var crypto_sign_ed25519_BYTES = 64;
      var crypto_sign_BYTES = crypto_sign_ed25519_BYTES;
      var crypto_sign_PUBLICKEYBYTES = crypto_sign_ed25519_PUBLICKEYBYTES;
      var crypto_sign_SECRETKEYBYTES = crypto_sign_ed25519_SECRETKEYBYTES;
      var crypto_sign_SEEDBYTES = crypto_sign_ed25519_SEEDBYTES;
      module.exports = {
        crypto_sign_keypair,
        crypto_sign_seed_keypair,
        crypto_sign,
        crypto_sign_detached,
        crypto_sign_open,
        crypto_sign_verify_detached,
        crypto_sign_BYTES,
        crypto_sign_PUBLICKEYBYTES,
        crypto_sign_SECRETKEYBYTES,
        crypto_sign_SEEDBYTES,
        crypto_sign_ed25519_PUBLICKEYBYTES,
        crypto_sign_ed25519_SECRETKEYBYTES,
        crypto_sign_ed25519_SEEDBYTES,
        crypto_sign_ed25519_BYTES,
        crypto_sign_ed25519_pk_to_curve25519,
        crypto_sign_ed25519_sk_to_curve25519,
        crypto_sign_ed25519_sk_to_pk,
        unpackneg,
        pack: pack2
      };
      function set25519(r2, a2) {
        for (let i2 = 0; i2 < 16; i2++) r2[i2] = a2[i2] | 0;
      }
      function pow2523(o2, i2) {
        var c2 = gf();
        var a2;
        for (a2 = 0; a2 < 16; a2++) c2[a2] = i2[a2];
        for (a2 = 250; a2 >= 0; a2--) {
          S2(c2, c2);
          if (a2 !== 1) M2(c2, c2, i2);
        }
        for (a2 = 0; a2 < 16; a2++) o2[a2] = c2[a2];
      }
      function add(p2, q2) {
        var a2 = gf(), b2 = gf(), c2 = gf(), d2 = gf(), e = gf(), f2 = gf(), g2 = gf(), h2 = gf(), t2 = gf();
        Z2(a2, p2[1], p2[0]);
        Z2(t2, q2[1], q2[0]);
        M2(a2, a2, t2);
        A3(b2, p2[0], p2[1]);
        A3(t2, q2[0], q2[1]);
        M2(b2, b2, t2);
        M2(c2, p2[3], q2[3]);
        M2(c2, c2, D22);
        M2(d2, p2[2], q2[2]);
        A3(d2, d2, d2);
        Z2(e, b2, a2);
        Z2(f2, d2, c2);
        A3(g2, d2, c2);
        A3(h2, b2, a2);
        M2(p2[0], e, f2);
        M2(p2[1], h2, g2);
        M2(p2[2], g2, f2);
        M2(p2[3], e, h2);
      }
      function cswap(p2, q2, b2) {
        var i2;
        for (i2 = 0; i2 < 4; i2++) {
          sel25519(p2[i2], q2[i2], b2);
        }
      }
      function pack2(r2, p2) {
        var tx = gf(), ty = gf(), zi = gf();
        inv25519(zi, p2[2]);
        M2(tx, p2[0], zi);
        M2(ty, p2[1], zi);
        pack25519(r2, ty);
        r2[31] ^= par25519(tx) << 7;
      }
      function scalarmult(p2, q2, s2) {
        var h2 = [gf(q2[0]), gf(q2[1]), gf(q2[2]), gf(q2[3])];
        var b2, i2;
        set25519(p2[0], gf0);
        set25519(p2[1], gf1);
        set25519(p2[2], gf1);
        set25519(p2[3], gf0);
        for (i2 = 255; i2 >= 0; --i2) {
          b2 = s2[i2 / 8 | 0] >> (i2 & 7) & 1;
          cswap(p2, h2, b2);
          add(h2, p2);
          add(p2, p2);
          cswap(p2, h2, b2);
        }
      }
      function scalarbase(p2, s2) {
        var q2 = [gf(), gf(), gf(), gf()];
        set25519(q2[0], X2);
        set25519(q2[1], Y2);
        set25519(q2[2], gf1);
        M2(q2[3], X2, Y2);
        scalarmult(p2, q2, s2);
      }
      function crypto_sign_keypair(pk, sk, seeded) {
        check2(pk, crypto_sign_PUBLICKEYBYTES);
        check2(sk, crypto_sign_SECRETKEYBYTES);
        var d2 = new Uint8Array(64);
        var p2 = [gf(), gf(), gf(), gf()];
        var i2;
        if (!seeded) randombytes(sk, 32);
        crypto_hash(d2, sk, 32);
        d2[0] &= 248;
        d2[31] &= 127;
        d2[31] |= 64;
        scalarbase(p2, d2);
        pack2(pk, p2);
        for (i2 = 0; i2 < 32; i2++) sk[i2 + 32] = pk[i2];
      }
      function crypto_sign_seed_keypair(pk, sk, seed) {
        check2(seed, crypto_sign_SEEDBYTES);
        sk.set(seed);
        return crypto_sign_keypair(pk, sk, true);
      }
      var L2 = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
      function modL(r2, x2) {
        var carry, i2, j2, k2;
        for (i2 = 63; i2 >= 32; --i2) {
          carry = 0;
          for (j2 = i2 - 32, k2 = i2 - 12; j2 < k2; ++j2) {
            x2[j2] += carry - 16 * x2[i2] * L2[j2 - (i2 - 32)];
            carry = x2[j2] + 128 >> 8;
            x2[j2] -= carry * 256;
          }
          x2[j2] += carry;
          x2[i2] = 0;
        }
        carry = 0;
        for (j2 = 0; j2 < 32; j2++) {
          x2[j2] += carry - (x2[31] >> 4) * L2[j2];
          carry = x2[j2] >> 8;
          x2[j2] &= 255;
        }
        for (j2 = 0; j2 < 32; j2++) x2[j2] -= carry * L2[j2];
        for (i2 = 0; i2 < 32; i2++) {
          x2[i2 + 1] += x2[i2] >> 8;
          r2[i2] = x2[i2] & 255;
        }
      }
      function reduce(r2) {
        var x2 = new Float64Array(64);
        for (let i2 = 0; i2 < 64; i2++) x2[i2] = r2[i2];
        for (let i2 = 0; i2 < 64; i2++) r2[i2] = 0;
        modL(r2, x2);
      }
      function crypto_sign(sm, m2, sk) {
        check2(sm, crypto_sign_BYTES + m2.length);
        check2(m2, 0);
        check2(sk, crypto_sign_SECRETKEYBYTES);
        var n2 = m2.length;
        var d2 = new Uint8Array(64), h2 = new Uint8Array(64), r2 = new Uint8Array(64);
        var i2, j2, x2 = new Float64Array(64);
        var p2 = [gf(), gf(), gf(), gf()];
        crypto_hash(d2, sk, 32);
        d2[0] &= 248;
        d2[31] &= 127;
        d2[31] |= 64;
        var smlen = n2 + 64;
        for (i2 = 0; i2 < n2; i2++) sm[64 + i2] = m2[i2];
        for (i2 = 0; i2 < 32; i2++) sm[32 + i2] = d2[32 + i2];
        crypto_hash(r2, sm.subarray(32), n2 + 32);
        reduce(r2);
        scalarbase(p2, r2);
        pack2(sm, p2);
        for (i2 = 32; i2 < 64; i2++) sm[i2] = sk[i2];
        crypto_hash(h2, sm, n2 + 64);
        reduce(h2);
        for (i2 = 0; i2 < 64; i2++) x2[i2] = 0;
        for (i2 = 0; i2 < 32; i2++) x2[i2] = r2[i2];
        for (i2 = 0; i2 < 32; i2++) {
          for (j2 = 0; j2 < 32; j2++) {
            x2[i2 + j2] += h2[i2] * d2[j2];
          }
        }
        modL(sm.subarray(32), x2);
        return smlen;
      }
      function crypto_sign_detached(sig, m2, sk) {
        var sm = new Uint8Array(m2.length + crypto_sign_BYTES);
        crypto_sign(sm, m2, sk);
        for (let i2 = 0; i2 < crypto_sign_BYTES; i2++) sig[i2] = sm[i2];
      }
      function unpackneg(r2, p2) {
        var t2 = gf(), chk = gf(), num = gf(), den = gf(), den2 = gf(), den4 = gf(), den6 = gf();
        set25519(r2[2], gf1);
        unpack25519(r2[1], p2);
        S2(num, r2[1]);
        M2(den, num, D2);
        Z2(num, num, r2[2]);
        A3(den, r2[2], den);
        S2(den2, den);
        S2(den4, den2);
        M2(den6, den4, den2);
        M2(t2, den6, num);
        M2(t2, t2, den);
        pow2523(t2, t2);
        M2(t2, t2, num);
        M2(t2, t2, den);
        M2(t2, t2, den);
        M2(r2[0], t2, den);
        S2(chk, r2[0]);
        M2(chk, chk, den);
        if (!neq25519(chk, num)) M2(r2[0], r2[0], I2);
        S2(chk, r2[0]);
        M2(chk, chk, den);
        if (!neq25519(chk, num)) return false;
        if (par25519(r2[0]) === p2[31] >> 7) {
          Z2(r2[0], gf(), r2[0]);
        }
        M2(r2[3], r2[0], r2[1]);
        return true;
      }
      function crypto_sign_open(msg, sm, pk) {
        check2(msg, sm.length - crypto_sign_BYTES);
        check2(sm, crypto_sign_BYTES);
        check2(pk, crypto_sign_PUBLICKEYBYTES);
        var n2 = sm.length;
        var m2 = new Uint8Array(sm.length);
        var i2, mlen;
        var t2 = new Uint8Array(32), h2 = new Uint8Array(64);
        var p2 = [gf(), gf(), gf(), gf()], q2 = [gf(), gf(), gf(), gf()];
        mlen = -1;
        if (n2 < 64) return false;
        if (!unpackneg(q2, pk)) return false;
        for (i2 = 0; i2 < n2; i2++) m2[i2] = sm[i2];
        for (i2 = 0; i2 < 32; i2++) m2[i2 + 32] = pk[i2];
        crypto_hash(h2, m2, n2);
        reduce(h2);
        scalarmult(p2, q2, h2);
        scalarbase(q2, sm.subarray(32));
        add(p2, q2);
        pack2(t2, p2);
        n2 -= 64;
        if (!crypto_verify_32(sm, 0, t2, 0)) {
          for (i2 = 0; i2 < n2; i2++) m2[i2] = 0;
          return false;
        }
        for (i2 = 0; i2 < n2; i2++) msg[i2] = sm[i2 + 64];
        mlen = n2;
        return true;
      }
      function crypto_sign_verify_detached(sig, m2, pk) {
        check2(sig, crypto_sign_BYTES);
        var sm = new Uint8Array(m2.length + crypto_sign_BYTES);
        var i2 = 0;
        for (i2 = 0; i2 < crypto_sign_BYTES; i2++) sm[i2] = sig[i2];
        for (i2 = 0; i2 < m2.length; i2++) sm[i2 + crypto_sign_BYTES] = m2[i2];
        return crypto_sign_open(m2, sm, pk);
      }
      function par25519(a2) {
        var d2 = new Uint8Array(32);
        pack25519(d2, a2);
        return d2[0] & 1;
      }
      function neq25519(a2, b2) {
        var c2 = new Uint8Array(32), d2 = new Uint8Array(32);
        pack25519(c2, a2);
        pack25519(d2, b2);
        return crypto_verify_32(c2, 0, d2, 0);
      }
      function ed25519_mul_l(p2, q2) {
        scalarmult(p2, q2, L2);
      }
      function ed25519_is_on_main_subgroup(p2) {
        var pl = [gf(), gf(), gf(), gf()];
        ed25519_mul_l(pl, p2);
        var zero = 0;
        for (let i2 = 0; i2 < 16; i2++) {
          zero |= pl[0][i2] & 65535;
        }
        return zero === 0;
      }
      function crypto_sign_ed25519_pk_to_curve25519(x25519_pk, ed25519_pk) {
        check2(x25519_pk, crypto_sign_PUBLICKEYBYTES);
        check2(ed25519_pk, crypto_sign_ed25519_PUBLICKEYBYTES);
        var a2 = [gf(), gf(), gf(), gf()];
        var x2 = gf([1]);
        var one_minus_y = gf([1]);
        assert(
          isSmallOrder(ed25519_pk) && unpackneg(a2, ed25519_pk) && ed25519_is_on_main_subgroup(a2),
          "Cannot convert key: bad point"
        );
        for (let i2 = 0; i2 < a2.length; i2++) {
          pack25519(x25519_pk, a2[i2]);
        }
        Z2(one_minus_y, one_minus_y, a2[1]);
        A3(x2, x2, a2[1]);
        inv25519(one_minus_y, one_minus_y);
        M2(x2, x2, one_minus_y);
        pack25519(x25519_pk, x2);
        return 0;
      }
      function isSmallOrder(s2) {
        Uint8Array.from([]);
        var bad_points = [
          // 0 (order 4)
          Uint8Array.from([
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ]),
          // 1 (order 1)
          Uint8Array.from([
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ]),
          // 2707385501144840649318225287225658788936804267575313519463743609750303402022(order 8)
          Uint8Array.from([
            38,
            232,
            149,
            143,
            194,
            178,
            39,
            176,
            69,
            195,
            244,
            137,
            242,
            239,
            152,
            240,
            213,
            223,
            172,
            5,
            211,
            198,
            51,
            57,
            177,
            56,
            2,
            136,
            109,
            83,
            252,
            5
          ]),
          // 55188659117513257062467267217118295137698188065244968500265048394206261417927 (order 8)
          Uint8Array.from([
            199,
            23,
            106,
            112,
            61,
            77,
            216,
            79,
            186,
            60,
            11,
            118,
            13,
            16,
            103,
            15,
            42,
            32,
            83,
            250,
            44,
            57,
            204,
            198,
            78,
            199,
            253,
            119,
            146,
            172,
            3,
            122
          ]),
          // p-1 (order 2)
          Uint8Array.from([
            236,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            127
          ]),
          //  p (=0 order 4)
          Uint8Array.from([
            237,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            127
          ]),
          // p + 1 (=1 order 1)
          Uint8Array.from([
            238,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            127
          ])
        ];
        var c2 = new Uint8Array(7);
        var j2;
        check2(bad_points, 7);
        for (let i2 = 0; i2 < bad_points.length; i2++) {
          for (j2 = 0; j2 < 31; j2++) {
            c2[i2] |= s2[j2] ^ bad_points[i2][j2];
          }
        }
        for (let i2 = 0; i2 < bad_points.length; i2++) {
          c2[i2] |= s2[j2] & 127 ^ bad_points[i2][j2];
        }
        var k2 = 0;
        for (let i2 = 0; i2 < bad_points.length; i2++) {
          k2 |= c2[i2] - 1;
        }
        return (k2 >> 8 & 1) === 0;
      }
      function crypto_sign_ed25519_sk_to_pk(pk, sk) {
        check2(pk, crypto_sign_ed25519_PUBLICKEYBYTES);
        pk.set(sk.subarray(crypto_sign_ed25519_SEEDBYTES));
        return pk;
      }
      function crypto_sign_ed25519_sk_to_curve25519(curveSk, edSk) {
        assert(curveSk && curveSk.byteLength === crypto_scalarmult_BYTES, "curveSk must be 'crypto_sign_SECRETKEYBYTES' long");
        assert(edSk && edSk.byteLength === crypto_sign_ed25519_SECRETKEYBYTES, "edSk must be 'crypto_sign_ed25519_SECRETKEYBYTES' long");
        var h2 = new Uint8Array(crypto_hash_sha512_BYTES);
        crypto_hash(h2, edSk, 32);
        h2[0] &= 248;
        h2[31] &= 127;
        h2[31] |= 64;
        curveSk.set(h2.subarray(0, crypto_scalarmult_BYTES));
        h2.fill(0);
        return curveSk;
      }
      function check2(buf, len, arg = "Argument") {
        if (!buf || len && buf.length < len) throw new Error(arg + " must be a buffer" + (len ? " of length " + len : ""));
      }
    }
  });

  // node_modules/sodium-javascript/index.js
  var require_sodium_javascript = __commonJS({
    "node_modules/sodium-javascript/index.js"(exports, module) {
      "use strict";
      forward(require_randombytes());
      forward(require_memory());
      forward(require_helpers());
      forward(require_crypto_verify());
      forward(require_crypto_auth());
      forward(require_crypto_box());
      forward(require_crypto_generichash());
      forward(require_crypto_hash());
      forward(require_crypto_hash_sha256());
      forward(require_crypto_kdf());
      forward(require_crypto_kx());
      forward(require_crypto_aead());
      forward(require_crypto_onetimeauth());
      forward(require_crypto_scalarmult());
      forward(require_crypto_secretbox());
      forward(require_crypto_secretstream());
      forward(require_crypto_shorthash());
      forward(require_crypto_sign());
      forward(require_crypto_stream());
      forward(require_crypto_stream_chacha20());
      function forward(submodule) {
        Object.keys(submodule).forEach(function(prop) {
          module.exports[prop] = submodule[prop];
        });
      }
    }
  });

  // node_modules/noise-handshake/cipher.js
  var require_cipher = __commonJS({
    "node_modules/noise-handshake/cipher.js"(exports, module) {
      var sodium = require_sodium_javascript();
      var b4a = require_browser();
      module.exports = class CipherState {
        constructor(key) {
          this.key = key || null;
          this.nonce = 0;
          this.CIPHER_ALG = "ChaChaPoly";
        }
        initialiseKey(key) {
          this.key = key;
          this.nonce = 0;
        }
        setNonce(nonce) {
          this.nonce = nonce;
        }
        encrypt(plaintext, ad) {
          if (!this.hasKey) return plaintext;
          if (!ad) ad = b4a.alloc(0);
          const ciphertext = encryptWithAD(this.key, this.nonce, ad, plaintext);
          if (ciphertext.length > 65535) throw new Error(`ciphertext length of ${ciphertext.length} exceeds maximum Noise message length of 65535`);
          this.nonce++;
          return ciphertext;
        }
        decrypt(ciphertext, ad) {
          if (!this.hasKey) return ciphertext;
          if (!ad) ad = b4a.alloc(0);
          if (ciphertext.length > 65535) throw new Error(`ciphertext length of ${ciphertext.length} exceeds maximum Noise message length of 65535`);
          const plaintext = decryptWithAD(this.key, this.nonce, ad, ciphertext);
          this.nonce++;
          return plaintext;
        }
        get hasKey() {
          return this.key !== null;
        }
        _clear() {
          sodium.sodium_memzero(this.key);
          this.key = null;
          this.nonce = null;
        }
        static get MACBYTES() {
          return 16;
        }
        static get NONCEBYTES() {
          return 8;
        }
        static get KEYBYTES() {
          return 32;
        }
      };
      function encryptWithAD(key, counter, additionalData, plaintext) {
        if (!b4a.isBuffer(additionalData)) additionalData = b4a.from(additionalData, "hex");
        if (!b4a.isBuffer(plaintext)) plaintext = b4a.from(plaintext, "hex");
        const nonce = b4a.alloc(sodium.crypto_aead_chacha20poly1305_ietf_NPUBBYTES);
        const view = new DataView(nonce.buffer, nonce.byteOffset, nonce.byteLength);
        view.setUint32(4, counter, true);
        const ciphertext = b4a.alloc(plaintext.byteLength + sodium.crypto_aead_chacha20poly1305_ietf_ABYTES);
        sodium.crypto_aead_chacha20poly1305_ietf_encrypt(ciphertext, plaintext, additionalData, null, nonce, key);
        return ciphertext;
      }
      function decryptWithAD(key, counter, additionalData, ciphertext) {
        if (!b4a.isBuffer(additionalData)) additionalData = b4a.from(additionalData, "hex");
        if (!b4a.isBuffer(ciphertext)) ciphertext = b4a.from(ciphertext, "hex");
        if (ciphertext.byteLength < sodium.crypto_aead_chacha20poly1305_ietf_ABYTES) throw new Error(`ciphertext length of ${ciphertext.byteLength} is shorter than the MAC`);
        const nonce = b4a.alloc(sodium.crypto_aead_chacha20poly1305_ietf_NPUBBYTES);
        const view = new DataView(nonce.buffer, nonce.byteOffset, nonce.byteLength);
        view.setUint32(4, counter, true);
        const plaintext = b4a.alloc(ciphertext.byteLength - sodium.crypto_aead_chacha20poly1305_ietf_ABYTES);
        sodium.crypto_aead_chacha20poly1305_ietf_decrypt(plaintext, null, ciphertext, additionalData, nonce, key);
        return plaintext;
      }
    }
  });

  // node_modules/noise-handshake/dh.js
  var require_dh = __commonJS({
    "node_modules/noise-handshake/dh.js"(exports, module) {
      var {
        crypto_kx_SEEDBYTES,
        crypto_kx_keypair,
        crypto_kx_seed_keypair,
        crypto_scalarmult_BYTES,
        crypto_scalarmult_SCALARBYTES,
        crypto_scalarmult,
        crypto_scalarmult_base
      } = require_sodium_javascript();
      var assert = require_nanoassert();
      var b4a = require_browser();
      var DHLEN = crypto_scalarmult_BYTES;
      var PKLEN = crypto_scalarmult_BYTES;
      var SKLEN = crypto_scalarmult_SCALARBYTES;
      var SEEDLEN = crypto_kx_SEEDBYTES;
      var ALG = "25519";
      module.exports = {
        DHLEN,
        PKLEN,
        SKLEN,
        SEEDLEN,
        ALG,
        generateKeyPair,
        generateSeedKeyPair,
        dh
      };
      function generateKeyPair(privKey) {
        const keyPair = {};
        keyPair.secretKey = privKey || b4a.alloc(SKLEN);
        keyPair.publicKey = b4a.alloc(PKLEN);
        if (privKey) {
          crypto_scalarmult_base(keyPair.publicKey, keyPair.secretKey);
        } else {
          crypto_kx_keypair(keyPair.publicKey, keyPair.secretKey);
        }
        return keyPair;
      }
      function generateSeedKeyPair(seed) {
        assert(seed.byteLength === SKLEN);
        const keyPair = {};
        keyPair.secretKey = b4a.alloc(SKLEN);
        keyPair.publicKey = b4a.alloc(PKLEN);
        crypto_kx_seed_keypair(keyPair.publicKey, keyPair.secretKey, seed);
        return keyPair;
      }
      function dh(publicKey, { secretKey }) {
        assert(secretKey.byteLength === SKLEN);
        assert(publicKey.byteLength === PKLEN);
        const output = b4a.alloc(DHLEN);
        crypto_scalarmult(
          output,
          secretKey,
          publicKey
        );
        return output;
      }
    }
  });

  // node_modules/noise-handshake/hmac.js
  var require_hmac = __commonJS({
    "node_modules/noise-handshake/hmac.js"(exports, module) {
      var b4a = require_browser();
      var { sodium_memzero, crypto_generichash, crypto_generichash_batch } = require_sodium_javascript();
      var HASHLEN = 64;
      var BLOCKLEN = 128;
      var scratch = b4a.alloc(BLOCKLEN * 3);
      var HMACKey = scratch.subarray(BLOCKLEN * 0, BLOCKLEN * 1);
      var OuterKeyPad = scratch.subarray(BLOCKLEN * 1, BLOCKLEN * 2);
      var InnerKeyPad = scratch.subarray(BLOCKLEN * 2, BLOCKLEN * 3);
      module.exports = function hmac(out, batch, key) {
        if (key.byteLength > BLOCKLEN) {
          crypto_generichash(HMACKey.subarray(0, HASHLEN), key);
          sodium_memzero(HMACKey.subarray(HASHLEN));
        } else {
          HMACKey.set(key);
          sodium_memzero(HMACKey.subarray(key.byteLength));
        }
        for (let i2 = 0; i2 < HMACKey.byteLength; i2++) {
          OuterKeyPad[i2] = 92 ^ HMACKey[i2];
          InnerKeyPad[i2] = 54 ^ HMACKey[i2];
        }
        sodium_memzero(HMACKey);
        crypto_generichash_batch(out, [InnerKeyPad].concat(batch));
        sodium_memzero(InnerKeyPad);
        crypto_generichash_batch(out, [OuterKeyPad, out]);
        sodium_memzero(OuterKeyPad);
      };
      module.exports.BYTES = HASHLEN;
      module.exports.KEYBYTES = BLOCKLEN;
    }
  });

  // node_modules/noise-handshake/hkdf.js
  var require_hkdf = __commonJS({
    "node_modules/noise-handshake/hkdf.js"(exports, module) {
      var hmacBlake2b = require_hmac();
      var b4a = require_browser();
      var HASHLEN = 64;
      module.exports = {
        hkdf,
        HASHLEN
      };
      function hkdf(salt, inputKeyMaterial, info = "", length = 2 * HASHLEN) {
        const pseudoRandomKey = hkdfExtract(salt, inputKeyMaterial);
        return hkdfExpand(pseudoRandomKey, info, length);
      }
      function hkdfExtract(salt, inputKeyMaterial) {
        const hmac = b4a.alloc(HASHLEN);
        return hmacDigest(hmac, salt, inputKeyMaterial);
      }
      function hkdfExpand(key, info, length) {
        const buffer = b4a.allocUnsafeSlow(length);
        const infoBuf = b4a.from(info);
        let prev = infoBuf;
        const result = [];
        for (let i2 = 0; i2 < length; i2 += HASHLEN) {
          const pos = b4a.from([i2 / HASHLEN + 1]);
          const out = buffer.subarray(i2, i2 + HASHLEN);
          result.push(out);
          prev = hmacDigest(out, key, [prev, infoBuf, pos]);
        }
        return result;
      }
      function hmacDigest(out, key, input) {
        hmacBlake2b(out, input, key);
        return out;
      }
    }
  });

  // node_modules/noise-handshake/symmetric-state.js
  var require_symmetric_state = __commonJS({
    "node_modules/noise-handshake/symmetric-state.js"(exports, module) {
      var sodium = require_sodium_javascript();
      var assert = require_nanoassert();
      var b4a = require_browser();
      var CipherState = require_cipher();
      var curve = require_dh();
      var { HASHLEN, hkdf } = require_hkdf();
      module.exports = class SymmetricState extends CipherState {
        constructor(opts = {}) {
          super();
          this.curve = opts.curve || curve;
          this.digest = b4a.alloc(HASHLEN);
          this.chainingKey = null;
          this.offset = 0;
          this.DH_ALG = this.curve.ALG;
        }
        mixHash(data) {
          accumulateDigest(this.digest, data);
        }
        mixKeyAndHash(key) {
          const [ck, tempH, tempK] = hkdf(this.chainingKey, key, "", 3 * HASHLEN);
          this.chainingKey = ck;
          this.mixHash(tempH);
          this.initialiseKey(tempK.subarray(0, 32));
        }
        mixKeyNormal(key) {
          const [ck, tempK] = hkdf(this.chainingKey, key);
          this.chainingKey = ck;
          this.initialiseKey(tempK.subarray(0, 32));
        }
        mixKey(remoteKey, localKey) {
          const dh = this.curve.dh(remoteKey, localKey);
          const hkdfResult = hkdf(this.chainingKey, dh);
          this.chainingKey = hkdfResult[0];
          this.initialiseKey(hkdfResult[1].subarray(0, 32));
        }
        encryptAndHash(plaintext) {
          const ciphertext = this.encrypt(plaintext, this.digest);
          accumulateDigest(this.digest, ciphertext);
          return ciphertext;
        }
        decryptAndHash(ciphertext) {
          const plaintext = this.decrypt(ciphertext, this.digest);
          accumulateDigest(this.digest, ciphertext);
          return plaintext;
        }
        getHandshakeHash(out) {
          if (!out) return this.getHandshakeHash(b4a.alloc(HASHLEN));
          assert(out.byteLength === HASHLEN, `output must be ${HASHLEN} bytes`);
          out.set(this.digest);
          return out;
        }
        split() {
          const res = hkdf(this.chainingKey, b4a.alloc(0));
          return res.map((k2) => k2.subarray(0, 32));
        }
        _clear() {
          super._clear();
          sodium.sodium_memzero(this.digest);
          sodium.sodium_memzero(this.chainingKey);
          this.digest = null;
          this.chainingKey = null;
          this.offset = null;
          this.curve = null;
        }
        static get alg() {
          return CipherState.alg + "_BLAKE2b";
        }
      };
      function accumulateDigest(digest2, input) {
        const toHash = b4a.concat([digest2, input]);
        sodium.crypto_generichash(digest2, toHash);
      }
    }
  });

  // node_modules/noise-handshake/noise.js
  var require_noise = __commonJS({
    "node_modules/noise-handshake/noise.js"(exports, module) {
      var assert = require_nanoassert();
      var b4a = require_browser();
      var SymmetricState = require_symmetric_state();
      var { HASHLEN } = require_hkdf();
      var PRESHARE_IS = Symbol("initiator static key preshared");
      var PRESHARE_RS = Symbol("responder static key preshared");
      var TOK_PSK = Symbol("psk");
      var TOK_S = Symbol("s");
      var TOK_E = Symbol("e");
      var TOK_ES = Symbol("es");
      var TOK_SE = Symbol("se");
      var TOK_EE = Symbol("ee");
      var TOK_SS = Symbol("ss");
      var HANDSHAKES = Object.freeze({
        NN: [
          [TOK_E],
          [TOK_E, TOK_EE]
        ],
        NNpsk0: [
          [TOK_PSK, TOK_E],
          [TOK_E, TOK_EE]
        ],
        XX: [
          [TOK_E],
          [TOK_E, TOK_EE, TOK_S, TOK_ES],
          [TOK_S, TOK_SE]
        ],
        XXpsk0: [
          [TOK_PSK, TOK_E],
          [TOK_E, TOK_EE, TOK_S, TOK_ES],
          [TOK_S, TOK_SE]
        ],
        IK: [
          PRESHARE_RS,
          [TOK_E, TOK_ES, TOK_S, TOK_SS],
          [TOK_E, TOK_EE, TOK_SE]
        ],
        XK: [
          PRESHARE_RS,
          [TOK_E, TOK_ES],
          [TOK_E, TOK_EE],
          [TOK_S, TOK_SE]
        ]
      });
      var Writer = class {
        constructor() {
          this.size = 0;
          this.buffers = [];
        }
        push(b2) {
          this.size += b2.byteLength;
          this.buffers.push(b2);
        }
        end() {
          const all = b4a.alloc(this.size);
          let offset = 0;
          for (const b2 of this.buffers) {
            all.set(b2, offset);
            offset += b2.byteLength;
          }
          return all;
        }
      };
      var Reader = class {
        constructor(buf) {
          this.offset = 0;
          this.buffer = buf;
        }
        shift(n2) {
          const start = this.offset;
          const end = this.offset += n2;
          if (end > this.buffer.byteLength) throw new Error("Insufficient bytes");
          return this.buffer.subarray(start, end);
        }
        end() {
          return this.shift(this.buffer.byteLength - this.offset);
        }
      };
      module.exports = class NoiseState extends SymmetricState {
        constructor(pattern, initiator, staticKeypair, opts = {}) {
          super(opts);
          this.s = staticKeypair || this.curve.generateKeyPair();
          this.e = null;
          this.psk = null;
          if (opts && opts.psk) this.psk = opts.psk;
          this.re = null;
          this.rs = null;
          this.pattern = pattern;
          this.handshake = HANDSHAKES[this.pattern].slice();
          this.isPskHandshake = !!this.psk && hasPskToken(this.handshake);
          this.protocol = b4a.from([
            "Noise",
            this.pattern,
            this.DH_ALG,
            this.CIPHER_ALG,
            "BLAKE2b"
          ].join("_"));
          this.initiator = initiator;
          this.complete = false;
          this.rx = null;
          this.tx = null;
          this.hash = null;
        }
        initialise(prologue, remoteStatic) {
          if (this.protocol.byteLength <= HASHLEN) this.digest.set(this.protocol);
          else this.mixHash(this.protocol);
          this.chainingKey = b4a.from(this.digest);
          this.mixHash(prologue);
          while (!Array.isArray(this.handshake[0])) {
            const message = this.handshake.shift();
            assert(
              message === PRESHARE_RS || message === PRESHARE_IS,
              "Unexpected pattern"
            );
            const takeRemoteKey = this.initiator ? message === PRESHARE_RS : message === PRESHARE_IS;
            if (takeRemoteKey) this.rs = remoteStatic;
            const key = takeRemoteKey ? this.rs : this.s.publicKey;
            assert(key != null, "Remote pubkey required");
            this.mixHash(key);
          }
        }
        final() {
          const [k1, k2] = this.split();
          this.tx = this.initiator ? k1 : k2;
          this.rx = this.initiator ? k2 : k1;
          this.complete = true;
          this.hash = this.getHandshakeHash();
          this._clear();
        }
        recv(buf) {
          const r2 = new Reader(buf);
          for (const pattern of this.handshake.shift()) {
            switch (pattern) {
              case TOK_PSK:
                this.mixKeyAndHash(this.psk);
                break;
              case TOK_E:
                this.re = r2.shift(this.curve.PKLEN);
                this.mixHash(this.re);
                if (this.isPskHandshake) this.mixKeyNormal(this.re);
                break;
              case TOK_S: {
                const klen = this.hasKey ? this.curve.PKLEN + 16 : this.curve.PKLEN;
                this.rs = this.decryptAndHash(r2.shift(klen));
                break;
              }
              case TOK_EE:
              case TOK_ES:
              case TOK_SE:
              case TOK_SS: {
                const useStatic = keyPattern(pattern, this.initiator);
                const localKey = useStatic.local ? this.s : this.e;
                const remoteKey = useStatic.remote ? this.rs : this.re;
                this.mixKey(remoteKey, localKey);
                break;
              }
              default:
                throw new Error("Unexpected message");
            }
          }
          const payload = this.decryptAndHash(r2.end());
          if (!this.handshake.length) this.final();
          return payload;
        }
        send(payload = b4a.alloc(0)) {
          const w2 = new Writer();
          for (const pattern of this.handshake.shift()) {
            switch (pattern) {
              case TOK_PSK:
                this.mixKeyAndHash(this.psk);
                break;
              case TOK_E:
                if (this.e === null) this.e = this.curve.generateKeyPair();
                this.mixHash(this.e.publicKey);
                if (this.isPskHandshake) this.mixKeyNormal(this.e.publicKey);
                w2.push(this.e.publicKey);
                break;
              case TOK_S:
                w2.push(this.encryptAndHash(this.s.publicKey));
                break;
              case TOK_ES:
              case TOK_SE:
              case TOK_EE:
              case TOK_SS: {
                const useStatic = keyPattern(pattern, this.initiator);
                const localKey = useStatic.local ? this.s : this.e;
                const remoteKey = useStatic.remote ? this.rs : this.re;
                this.mixKey(remoteKey, localKey);
                break;
              }
              default:
                throw new Error("Unexpected message");
            }
          }
          w2.push(this.encryptAndHash(payload));
          const response = w2.end();
          if (!this.handshake.length) this.final();
          return response;
        }
        _clear() {
          super._clear();
          this.e.secretKey.fill(0);
          this.e.publicKey.fill(0);
          this.re.fill(0);
          this.e = null;
          this.re = null;
        }
      };
      function keyPattern(pattern, initiator) {
        const ret = {
          local: false,
          remote: false
        };
        switch (pattern) {
          case TOK_EE:
            return ret;
          case TOK_ES:
            ret.local ^= !initiator;
            ret.remote ^= initiator;
            return ret;
          case TOK_SE:
            ret.local ^= initiator;
            ret.remote ^= !initiator;
            return ret;
          case TOK_SS:
            ret.local ^= 1;
            ret.remote ^= 1;
            return ret;
        }
      }
      function hasPskToken(handshake) {
        return handshake.some((x2) => {
          return Array.isArray(x2) && x2.indexOf(TOK_PSK) !== -1;
        });
      }
    }
  });

  // src/deps.mjs
  var import_noise_handshake = __toESM(require_noise(), 1);

  // node_modules/libsodium/dist/modules-esm/libsodium.mjs
  var import_meta = {};
  async function A(A3 = {}) {
    var I2, g2 = A3, C2 = !!globalThis.window, B2 = !!globalThis.WorkerGlobalScope, Q2 = (globalThis.process?.versions?.node && globalThis.process, import_meta.url);
    if (C2 || B2) {
      try {
        new URL(".", Q2).href;
      } catch {
      }
      B2 && (I2 = (A4) => {
        var I3 = new XMLHttpRequest();
        return I3.open("GET", A4, false), I3.responseType = "arraybuffer", I3.send(null), new Uint8Array(I3.response);
      });
    }
    (function() {
    }).bind();
    var E2, i2, D2, F2, o2, w2, h2, S2, y2, k2, c2, M2 = function() {
    }.bind(), U2 = false, G2 = false;
    function J2() {
      var A4 = d2.buffer;
      h2 = new Int8Array(A4), o2 = new Int16Array(A4), g2.HEAPU8 = c2 = new Uint8Array(A4), new Uint16Array(A4), w2 = new Int32Array(A4), k2 = new Uint32Array(A4), S2 = new Float32Array(A4), y2 = new Float64Array(A4);
    }
    function Y2(A4) {
      g2.onAbort?.(A4), M2(A4 = `Aborted(${A4})`), U2 = true, A4 += ". Build with -sASSERTIONS for more info.";
      var I3 = new WebAssembly.RuntimeError(A4);
      throw D2?.(I3), I3;
    }
    for (var N2 = (A4) => {
      for (; A4.length > 0; ) A4.shift()(g2);
    }, K2 = [], H2 = (A4) => K2.push(A4), a2 = [], f2 = (A4) => a2.push(A4), s2 = globalThis.TextDecoder && new TextDecoder(), L2 = (A4, I3, g3) => A4 ? ((A5, I4 = 0, g4, C3) => {
      var B3 = ((A6, I5, g5, C4) => {
        var B4 = I5 + g5;
        if (C4) return B4;
        for (; A6[I5] && !(I5 >= B4); ) ++I5;
        return I5;
      })(A5, I4, g4, C3);
      if (B3 - I4 > 16 && A5.buffer && s2) return s2.decode(A5.subarray(I4, B3));
      for (var Q3 = ""; I4 < B3; ) {
        var E3 = A5[I4++];
        if (128 & E3) {
          var i3 = 63 & A5[I4++];
          if (192 != (224 & E3)) {
            var D3 = 63 & A5[I4++];
            if ((E3 = 224 == (240 & E3) ? (15 & E3) << 12 | i3 << 6 | D3 : (7 & E3) << 18 | i3 << 12 | D3 << 6 | 63 & A5[I4++]) < 65536) Q3 += String.fromCharCode(E3);
            else {
              var F3 = E3 - 65536;
              Q3 += String.fromCharCode(55296 | F3 >> 10, 56320 | 1023 & F3);
            }
          } else Q3 += String.fromCharCode((31 & E3) << 6 | i3);
        } else Q3 += String.fromCharCode(E3);
      }
      return Q3;
    })(c2, A4, I3, g3) : "", R2 = [], p2 = (A4, I3) => Math.ceil(A4 / I3) * I3, t2 = (A4) => {
      var I3 = (A4 - d2.buffer.byteLength + 65535) / 65536 | 0;
      try {
        return d2.grow(I3), J2(), 1;
      } catch (A5) {
      }
    }, n2 = new Uint8Array(123), q2 = 25; q2 >= 0; --q2) n2[48 + q2] = 52 + q2, n2[65 + q2] = q2, n2[97 + q2] = 26 + q2;
    if (n2[43] = 62, n2[47] = 63, g2.noExitRuntime && g2.noExitRuntime, g2.print && g2.print, g2.printErr && (M2 = g2.printErr), g2.wasmBinary && (E2 = g2.wasmBinary), g2.arguments && g2.arguments, g2.thisProgram && g2.thisProgram, g2.preInit) for ("function" == typeof g2.preInit && (g2.preInit = [g2.preInit]); g2.preInit.length > 0; ) g2.preInit.shift()();
    g2.setValue = function(A4, I3, g3 = "i8") {
      switch (g3.endsWith("*") && (g3 = "*"), g3) {
        case "i1":
        case "i8":
          h2[A4] = I3;
          break;
        case "i16":
          o2[A4 >> 1] = I3;
          break;
        case "i32":
          w2[A4 >> 2] = I3;
          break;
        case "i64":
          Y2("to do setValue(i64) use WASM_BIGINT");
        case "float":
          S2[A4 >> 2] = I3;
          break;
        case "double":
          y2[A4 >> 3] = I3;
          break;
        case "*":
          k2[A4 >> 2] = I3;
          break;
        default:
          Y2(`invalid type for setValue: ${g3}`);
      }
    }, g2.getValue = function(A4, I3 = "i8") {
      switch (I3.endsWith("*") && (I3 = "*"), I3) {
        case "i1":
        case "i8":
          return h2[A4];
        case "i16":
          return o2[A4 >> 1];
        case "i32":
          return w2[A4 >> 2];
        case "i64":
          Y2("to do getValue(i64) use WASM_BIGINT");
        case "float":
          return S2[A4 >> 2];
        case "double":
          return y2[A4 >> 3];
        case "*":
          return k2[A4 >> 2];
        default:
          Y2(`invalid type for getValue: ${I3}`);
      }
    }, g2.UTF8ToString = L2;
    var d2, O2, r2 = { 40216: () => g2.getRandomValue(), 40252: () => {
      if (void 0 === g2.getRandomValue) try {
        var A4 = "object" == typeof window ? window : self, I3 = void 0 !== A4.crypto ? A4.crypto : A4.msCrypto;
        I3 = void 0 === I3 ? B3 : I3;
        var C3 = function() {
          var A5 = new Uint32Array(1);
          return I3.getRandomValues(A5), A5[0] >>> 0;
        };
        C3(), g2.getRandomValue = C3;
      } catch (A5) {
        try {
          var B3 = require_crypto(), Q3 = function() {
            var A6 = B3.randomBytes(4);
            return (A6[0] << 24 | A6[1] << 16 | A6[2] << 8 | A6[3]) >>> 0;
          };
          Q3(), g2.getRandomValue = Q3;
        } catch (A6) {
          throw "No secure random number generator found";
        }
      }
    } }, e = { a: (A4, I3, g3, C3) => Y2(`Assertion failed: ${L2(A4)}, at: ` + [I3 ? L2(I3) : "unknown filename", g3, C3 ? L2(C3) : "unknown function"]), c: () => Y2(""), b: (A4, I3, g3) => ((A5, I4, g4) => {
      var C3 = ((A6, I5) => {
        var g5;
        for (R2.length = 0; g5 = c2[A6++]; ) {
          var C4 = 105 != g5;
          I5 += (C4 &= 112 != g5) && I5 % 8 ? 4 : 0, R2.push(112 == g5 ? k2[I5 >> 2] : 105 == g5 ? w2[I5 >> 2] : y2[I5 >> 3]), I5 += C4 ? 8 : 4;
        }
        return R2;
      })(I4, g4);
      return r2[A5](...C3);
    })(A4, I3, g3), d: (A4) => {
      var I3 = c2.length, g3 = 2147483648;
      if ((A4 >>>= 0) > g3) return false;
      for (var C3 = 1; C3 <= 4; C3 *= 2) {
        var B3 = I3 * (1 + 0.2 / C3);
        B3 = Math.min(B3, A4 + 100663296);
        var Q3 = Math.min(g3, p2(Math.max(A4, B3), 65536));
        if (t2(Q3)) return true;
      }
      return false;
    } };
    return O2 = await (async function() {
      function A4(A5, I3) {
        return (function(A6) {
          g2._crypto_aead_aegis128l_keybytes = A6.f, g2._crypto_aead_aegis128l_nsecbytes = A6.g, g2._crypto_aead_aegis128l_npubbytes = A6.h, g2._crypto_aead_aegis128l_abytes = A6.i, g2._crypto_aead_aegis128l_messagebytes_max = A6.j, g2._crypto_aead_aegis128l_keygen = A6.k, g2._crypto_aead_aegis128l_encrypt = A6.l, g2._crypto_aead_aegis128l_encrypt_detached = A6.m, g2._crypto_aead_aegis128l_decrypt = A6.n, g2._crypto_aead_aegis128l_decrypt_detached = A6.o, g2._crypto_aead_aegis256_keybytes = A6.p, g2._crypto_aead_aegis256_nsecbytes = A6.q, g2._crypto_aead_aegis256_npubbytes = A6.r, g2._crypto_aead_aegis256_abytes = A6.s, g2._crypto_aead_aegis256_messagebytes_max = A6.t, g2._crypto_aead_aegis256_keygen = A6.u, g2._crypto_aead_aegis256_encrypt = A6.v, g2._crypto_aead_aegis256_encrypt_detached = A6.w, g2._crypto_aead_aegis256_decrypt = A6.x, g2._crypto_aead_aegis256_decrypt_detached = A6.y, g2._crypto_aead_aes256gcm_is_available = A6.z, g2._crypto_aead_chacha20poly1305_encrypt_detached = A6.A, g2._crypto_aead_chacha20poly1305_encrypt = A6.B, g2._crypto_aead_chacha20poly1305_ietf_encrypt_detached = A6.C, g2._crypto_aead_chacha20poly1305_ietf_encrypt = A6.D, g2._crypto_aead_chacha20poly1305_decrypt_detached = A6.E, g2._crypto_aead_chacha20poly1305_decrypt = A6.F, g2._crypto_aead_chacha20poly1305_ietf_decrypt_detached = A6.G, g2._crypto_aead_chacha20poly1305_ietf_decrypt = A6.H, g2._crypto_aead_chacha20poly1305_ietf_keybytes = A6.I, g2._crypto_aead_chacha20poly1305_ietf_npubbytes = A6.J, g2._crypto_aead_chacha20poly1305_ietf_nsecbytes = A6.K, g2._crypto_aead_chacha20poly1305_ietf_abytes = A6.L, g2._crypto_aead_chacha20poly1305_ietf_messagebytes_max = A6.M, g2._crypto_aead_chacha20poly1305_ietf_keygen = A6.N, g2._crypto_aead_chacha20poly1305_keybytes = A6.O, g2._crypto_aead_chacha20poly1305_npubbytes = A6.P, g2._crypto_aead_chacha20poly1305_nsecbytes = A6.Q, g2._crypto_aead_chacha20poly1305_abytes = A6.R, g2._crypto_aead_chacha20poly1305_messagebytes_max = A6.S, g2._crypto_aead_chacha20poly1305_keygen = A6.T, g2._crypto_aead_xchacha20poly1305_ietf_encrypt_detached = A6.U, g2._crypto_aead_xchacha20poly1305_ietf_encrypt = A6.V, g2._crypto_aead_xchacha20poly1305_ietf_decrypt_detached = A6.W, g2._crypto_aead_xchacha20poly1305_ietf_decrypt = A6.X, g2._crypto_aead_xchacha20poly1305_ietf_keybytes = A6.Y, g2._crypto_aead_xchacha20poly1305_ietf_npubbytes = A6.Z, g2._crypto_aead_xchacha20poly1305_ietf_nsecbytes = A6._, g2._crypto_aead_xchacha20poly1305_ietf_abytes = A6.$, g2._crypto_aead_xchacha20poly1305_ietf_messagebytes_max = A6.aa, g2._crypto_aead_xchacha20poly1305_ietf_keygen = A6.ba, g2._crypto_auth_bytes = A6.ca, g2._crypto_auth_keybytes = A6.da, g2._crypto_auth = A6.ea, g2._crypto_auth_verify = A6.fa, g2._crypto_auth_keygen = A6.ga, g2._crypto_box_seedbytes = A6.ha, g2._crypto_box_publickeybytes = A6.ia, g2._crypto_box_secretkeybytes = A6.ja, g2._crypto_box_beforenmbytes = A6.ka, g2._crypto_box_noncebytes = A6.la, g2._crypto_box_macbytes = A6.ma, g2._crypto_box_messagebytes_max = A6.na, g2._crypto_box_seed_keypair = A6.oa, g2._crypto_box_keypair = A6.pa, g2._crypto_box_beforenm = A6.qa, g2._crypto_box_detached_afternm = A6.ra, g2._crypto_box_detached = A6.sa, g2._crypto_box_easy_afternm = A6.ta, g2._crypto_box_easy = A6.ua, g2._crypto_box_open_detached_afternm = A6.va, g2._crypto_box_open_detached = A6.wa, g2._crypto_box_open_easy_afternm = A6.xa, g2._crypto_box_open_easy = A6.ya, g2._crypto_box_seal = A6.za, g2._crypto_box_seal_open = A6.Aa, g2._crypto_box_sealbytes = A6.Ba, g2._crypto_generichash_bytes_min = A6.Ca, g2._crypto_generichash_bytes_max = A6.Da, g2._crypto_generichash_bytes = A6.Ea, g2._crypto_generichash_keybytes_min = A6.Fa, g2._crypto_generichash_keybytes_max = A6.Ga, g2._crypto_generichash_keybytes = A6.Ha, g2._crypto_generichash_statebytes = A6.Ia, g2._crypto_generichash = A6.Ja, g2._crypto_generichash_init = A6.Ka, g2._crypto_generichash_update = A6.La, g2._crypto_generichash_final = A6.Ma, g2._crypto_generichash_keygen = A6.Na, g2._crypto_hash_bytes = A6.Oa, g2._crypto_hash = A6.Pa, g2._crypto_hash_sha3256_bytes = A6.Qa, g2._crypto_hash_sha3256_statebytes = A6.Ra, g2._crypto_hash_sha3256_init = A6.Sa, g2._crypto_hash_sha3256_update = A6.Ta, g2._crypto_hash_sha3256_final = A6.Ua, g2._crypto_hash_sha3256 = A6.Va, g2._crypto_hash_sha3512_bytes = A6.Wa, g2._crypto_hash_sha3512_statebytes = A6.Xa, g2._crypto_hash_sha3512_init = A6.Ya, g2._crypto_hash_sha3512_update = A6.Za, g2._crypto_hash_sha3512_final = A6._a, g2._crypto_hash_sha3512 = A6.$a, g2._crypto_ipcrypt_bytes = A6.ab, g2._crypto_ipcrypt_keybytes = A6.bb, g2._crypto_ipcrypt_nd_keybytes = A6.cb, g2._crypto_ipcrypt_nd_tweakbytes = A6.db, g2._crypto_ipcrypt_nd_inputbytes = A6.eb, g2._crypto_ipcrypt_nd_outputbytes = A6.fb, g2._crypto_ipcrypt_ndx_keybytes = A6.gb, g2._crypto_ipcrypt_ndx_tweakbytes = A6.hb, g2._crypto_ipcrypt_ndx_inputbytes = A6.ib, g2._crypto_ipcrypt_ndx_outputbytes = A6.jb, g2._crypto_ipcrypt_pfx_keybytes = A6.kb, g2._crypto_ipcrypt_pfx_bytes = A6.lb, g2._crypto_ipcrypt_keygen = A6.mb, g2._crypto_ipcrypt_nd_keygen = A6.nb, g2._crypto_ipcrypt_ndx_keygen = A6.ob, g2._crypto_ipcrypt_pfx_keygen = A6.pb, g2._crypto_ipcrypt_encrypt = A6.qb, g2._crypto_ipcrypt_decrypt = A6.rb, g2._crypto_ipcrypt_nd_encrypt = A6.sb, g2._crypto_ipcrypt_nd_decrypt = A6.tb, g2._crypto_ipcrypt_ndx_encrypt = A6.ub, g2._crypto_ipcrypt_ndx_decrypt = A6.vb, g2._crypto_ipcrypt_pfx_encrypt = A6.wb, g2._crypto_ipcrypt_pfx_decrypt = A6.xb, g2._crypto_kdf_bytes_min = A6.yb, g2._crypto_kdf_bytes_max = A6.zb, g2._crypto_kdf_contextbytes = A6.Ab, g2._crypto_kdf_keybytes = A6.Bb, g2._crypto_kdf_derive_from_key = A6.Cb, g2._crypto_kdf_keygen = A6.Db, g2._crypto_kdf_hkdf_sha256_extract_init = A6.Eb, g2._crypto_kdf_hkdf_sha256_extract_update = A6.Fb, g2._crypto_kdf_hkdf_sha256_extract_final = A6.Gb, g2._crypto_kdf_hkdf_sha256_extract = A6.Hb, g2._crypto_kdf_hkdf_sha256_keygen = A6.Ib, g2._crypto_kdf_hkdf_sha256_expand = A6.Jb, g2._crypto_kdf_hkdf_sha256_keybytes = A6.Kb, g2._crypto_kdf_hkdf_sha256_bytes_min = A6.Lb, g2._crypto_kdf_hkdf_sha256_bytes_max = A6.Mb, g2._crypto_kdf_hkdf_sha256_statebytes = A6.Nb, g2._crypto_kdf_hkdf_sha512_extract_init = A6.Ob, g2._crypto_kdf_hkdf_sha512_extract_update = A6.Pb, g2._crypto_kdf_hkdf_sha512_extract_final = A6.Qb, g2._crypto_kdf_hkdf_sha512_extract = A6.Rb, g2._crypto_kdf_hkdf_sha512_keygen = A6.Sb, g2._crypto_kdf_hkdf_sha512_expand = A6.Tb, g2._crypto_kdf_hkdf_sha512_keybytes = A6.Ub, g2._crypto_kdf_hkdf_sha512_bytes_min = A6.Vb, g2._crypto_kdf_hkdf_sha512_bytes_max = A6.Wb, g2._crypto_kdf_hkdf_sha512_statebytes = A6.Xb, g2._crypto_kem_publickeybytes = A6.Yb, g2._crypto_kem_secretkeybytes = A6.Zb, g2._crypto_kem_ciphertextbytes = A6._b, g2._crypto_kem_sharedsecretbytes = A6.$b, g2._crypto_kem_seedbytes = A6.ac, g2._crypto_kem_primitive = A6.bc, g2._crypto_kem_seed_keypair = A6.cc, g2._crypto_kem_keypair = A6.dc, g2._crypto_kem_enc = A6.ec, g2._crypto_kem_dec = A6.fc, g2._crypto_kem_mlkem768_publickeybytes = A6.gc, g2._crypto_kem_mlkem768_secretkeybytes = A6.hc, g2._crypto_kem_mlkem768_ciphertextbytes = A6.ic, g2._crypto_kem_mlkem768_sharedsecretbytes = A6.jc, g2._crypto_kem_mlkem768_seedbytes = A6.kc, g2._crypto_kem_mlkem768_seed_keypair = A6.lc, g2._crypto_kem_mlkem768_keypair = A6.mc, g2._crypto_kem_mlkem768_enc = A6.nc, g2._crypto_kem_mlkem768_enc_deterministic = A6.oc, g2._crypto_kem_mlkem768_dec = A6.pc, g2._crypto_kem_xwing_publickeybytes = A6.qc, g2._crypto_kem_xwing_secretkeybytes = A6.rc, g2._crypto_kem_xwing_ciphertextbytes = A6.sc, g2._crypto_kem_xwing_sharedsecretbytes = A6.tc, g2._crypto_kem_xwing_seedbytes = A6.uc, g2._crypto_kem_xwing_seed_keypair = A6.vc, g2._crypto_kem_xwing_keypair = A6.wc, g2._crypto_kem_xwing_enc_deterministic = A6.xc, g2._crypto_kem_xwing_enc = A6.yc, g2._crypto_kem_xwing_dec = A6.zc, g2._crypto_kx_seed_keypair = A6.Ac, g2._crypto_kx_keypair = A6.Bc, g2._crypto_kx_client_session_keys = A6.Cc, g2._crypto_kx_server_session_keys = A6.Dc, g2._crypto_kx_publickeybytes = A6.Ec, g2._crypto_kx_secretkeybytes = A6.Fc, g2._crypto_kx_seedbytes = A6.Gc, g2._crypto_kx_sessionkeybytes = A6.Hc, g2._crypto_scalarmult_base = A6.Ic, g2._crypto_scalarmult = A6.Jc, g2._crypto_scalarmult_bytes = A6.Kc, g2._crypto_scalarmult_scalarbytes = A6.Lc, g2._crypto_secretbox_keybytes = A6.Mc, g2._crypto_secretbox_noncebytes = A6.Nc, g2._crypto_secretbox_macbytes = A6.Oc, g2._crypto_secretbox_messagebytes_max = A6.Pc, g2._crypto_secretbox_keygen = A6.Qc, g2._crypto_secretbox_detached = A6.Rc, g2._crypto_secretbox_easy = A6.Sc, g2._crypto_secretbox_open_detached = A6.Tc, g2._crypto_secretbox_open_easy = A6.Uc, g2._crypto_secretstream_xchacha20poly1305_keygen = A6.Vc, g2._crypto_secretstream_xchacha20poly1305_init_push = A6.Wc, g2._crypto_secretstream_xchacha20poly1305_init_pull = A6.Xc, g2._crypto_secretstream_xchacha20poly1305_rekey = A6.Yc, g2._crypto_secretstream_xchacha20poly1305_push = A6.Zc, g2._crypto_secretstream_xchacha20poly1305_pull = A6._c, g2._crypto_secretstream_xchacha20poly1305_statebytes = A6.$c, g2._crypto_secretstream_xchacha20poly1305_abytes = A6.ad, g2._crypto_secretstream_xchacha20poly1305_headerbytes = A6.bd, g2._crypto_secretstream_xchacha20poly1305_keybytes = A6.cd, g2._crypto_secretstream_xchacha20poly1305_messagebytes_max = A6.dd, g2._crypto_secretstream_xchacha20poly1305_tag_message = A6.ed, g2._crypto_secretstream_xchacha20poly1305_tag_push = A6.fd, g2._crypto_secretstream_xchacha20poly1305_tag_rekey = A6.gd, g2._crypto_secretstream_xchacha20poly1305_tag_final = A6.hd, g2._crypto_shorthash_bytes = A6.id, g2._crypto_shorthash_keybytes = A6.jd, g2._crypto_shorthash = A6.kd, g2._crypto_shorthash_keygen = A6.ld, g2._crypto_sign_statebytes = A6.md, g2._crypto_sign_bytes = A6.nd, g2._crypto_sign_seedbytes = A6.od, g2._crypto_sign_publickeybytes = A6.pd, g2._crypto_sign_secretkeybytes = A6.qd, g2._crypto_sign_messagebytes_max = A6.rd, g2._crypto_sign_seed_keypair = A6.sd, g2._crypto_sign_keypair = A6.td, g2._crypto_sign = A6.ud, g2._crypto_sign_open = A6.vd, g2._crypto_sign_detached = A6.wd, g2._crypto_sign_verify_detached = A6.xd, g2._crypto_sign_init = A6.yd, g2._crypto_sign_update = A6.zd, g2._crypto_sign_final_create = A6.Ad, g2._crypto_sign_final_verify = A6.Bd, g2._crypto_sign_ed25519_pk_to_curve25519 = A6.Cd, g2._crypto_sign_ed25519_sk_to_curve25519 = A6.Dd, g2._crypto_xof_shake128_blockbytes = A6.Ed, g2._crypto_xof_shake128_statebytes = A6.Fd, g2._crypto_xof_shake128_domain_standard = A6.Gd, g2._crypto_xof_shake128 = A6.Hd, g2._crypto_xof_shake128_init = A6.Id, g2._crypto_xof_shake128_init_with_domain = A6.Jd, g2._crypto_xof_shake128_update = A6.Kd, g2._crypto_xof_shake128_squeeze = A6.Ld, g2._crypto_xof_shake256_blockbytes = A6.Md, g2._crypto_xof_shake256_statebytes = A6.Nd, g2._crypto_xof_shake256_domain_standard = A6.Od, g2._crypto_xof_shake256 = A6.Pd, g2._crypto_xof_shake256_init = A6.Qd, g2._crypto_xof_shake256_init_with_domain = A6.Rd, g2._crypto_xof_shake256_update = A6.Sd, g2._crypto_xof_shake256_squeeze = A6.Td, g2._crypto_xof_turboshake128_blockbytes = A6.Ud, g2._crypto_xof_turboshake128_statebytes = A6.Vd, g2._crypto_xof_turboshake128_domain_standard = A6.Wd, g2._crypto_xof_turboshake128 = A6.Xd, g2._crypto_xof_turboshake128_init = A6.Yd, g2._crypto_xof_turboshake128_init_with_domain = A6.Zd, g2._crypto_xof_turboshake128_update = A6._d, g2._crypto_xof_turboshake128_squeeze = A6.$d, g2._crypto_xof_turboshake256_blockbytes = A6.ae, g2._crypto_xof_turboshake256_statebytes = A6.be, g2._crypto_xof_turboshake256_domain_standard = A6.ce, g2._crypto_xof_turboshake256 = A6.de, g2._crypto_xof_turboshake256_init = A6.ee, g2._crypto_xof_turboshake256_init_with_domain = A6.fe, g2._crypto_xof_turboshake256_update = A6.ge, g2._crypto_xof_turboshake256_squeeze = A6.he, g2._randombytes_random = A6.ie, g2._randombytes_stir = A6.je, g2._randombytes_uniform = A6.ke, g2._randombytes_buf = A6.le, g2._randombytes_buf_deterministic = A6.me, g2._randombytes_seedbytes = A6.ne, g2._randombytes_close = A6.oe, g2._randombytes = A6.pe, g2._sodium_bin2hex = A6.qe, g2._sodium_hex2bin = A6.re, g2._sodium_base64_encoded_len = A6.se, g2._sodium_bin2base64 = A6.te, g2._sodium_base642bin = A6.ue, g2._sodium_ip2bin = A6.ve, g2._sodium_bin2ip = A6.we, g2._sodium_init = A6.xe, g2._sodium_pad = A6.ye, g2._sodium_unpad = A6.ze, g2._sodium_version_string = A6.Ae, g2._sodium_library_version_major = A6.Be, g2._sodium_library_version_minor = A6.Ce, g2._sodium_library_minimal = A6.De, g2._malloc = A6.Ee, g2._free = A6.Fe, A6.dynCall_iiiji, A6.dynCall_iiij, A6.dynCall_iijii, A6.dynCall_iiijiji, A6.dynCall_iiijiii, d2 = A6.e, A6.__indirect_function_table;
        })(O2 = A5.exports), J2(), O2;
      }
      var C3 = { a: e };
      return g2.instantiateWasm ? new Promise((I3, B3) => {
        g2.instantiateWasm(C3, (g3, C4) => {
          I3(A4(g3));
        });
      }) : (F2 ??= ((A5) => {
        for (var I3, g3, C4 = 0, B3 = 0, Q3 = 295748, E3 = new Uint8Array(221811 - ("=" == A5[295746]) - ("=" == A5[295747])); C4 < Q3; C4 += 4, B3 += 3) I3 = n2[A5.charCodeAt(C4 + 1)], g3 = n2[A5.charCodeAt(C4 + 2)], E3[B3] = n2[A5.charCodeAt(C4)] << 2 | I3 >> 4, E3[B3 + 1] = I3 << 4 | g3 >> 2, E3[B3 + 2] = g3 << 6 | n2[A5.charCodeAt(C4 + 3)];
        return E3;
      })("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IgMgATQCGCIGfnwgAigCCCIsrCINIAE0AhAiB358IAIoAgwiLawiECABKAIMIi5BAXSsIhV+fCACKAIQIi+sIhEgATQCCCIIfnwgAigCFCIwrCIWIAEoAgQiMUEBdKwiF358IAIoAhgiMqwiICABNAIAIgl+fCACKAIcIjNBE2ysIgwgASgCJCI0QQF0rCIYfnwgAigCICI1QRNsrCIEIAE0AiAiCn58IAIoAiQiAkETbKwiBSABKAIcIgFBAXSsIhl+fCAHIAt+IAMgK6wiGn58IA0gLqwiG358IAggEH58IBEgMawiHH58IAkgFn58IDJBE2ysIg4gNKwiHX58IAogDH58IAQgAawiHn58IAUgBn58IAsgFX4gAyAHfnwgCCANfnwgECAXfnwgCSARfnwgMEETbKwiHyAYfnwgCiAOfnwgDCAZfnwgBCAGfnwgBSAUfnwiIkKAgIAQfCIjQhqHfCIkQoCAgAh8IiVCGYd8IhIgEkKAgIAQfCITQoCAgOAPg30+AhggACALIBd+IAMgCH58IAkgDX58IC1BE2ysIg8gGH58IAogL0ETbKwiEn58IBkgH358IAYgDn58IAwgFH58IAQgB358IAUgFX58IAkgC34gAyAcfnwgLEETbKwiISAdfnwgCiAPfnwgEiAefnwgBiAffnwgDiAafnwgByAMfnwgBCAbfnwgBSAIfnwgKkETbKwgGH4gAyAJfnwgCiAhfnwgDyAZfnwgBiASfnwgFCAffnwgByAOfnwgDCAVfnwgBCAIfnwgBSAXfnwiIUKAgIAQfCImQhqHfCInQoCAgAh8IihCGYd8Ig8gD0KAgIAQfCIpQoCAgOAPg30+AgggACAGIAt+IAMgHn58IA0gGn58IAcgEH58IBEgG358IAggFn58IBwgIH58IAkgM6wiD358IAQgHX58IAUgCn58IBNCGod8IhMgE0KAgIAIfCITQoCAgPAPg30+AhwgACAIIAt+IAMgG358IA0gHH58IAkgEH58IBIgHX58IAogH358IA4gHn58IAYgDH58IAQgGn58IAUgB358IClCGod8IgQgBEKAgIAIfCIEQoCAgPAPg30+AgwgACALIBl+IAMgCn58IAYgDX58IBAgFH58IAcgEX58IBUgFn58IAggIH58IA8gF358IAkgNawiDH58IAUgGH58IBNCGYd8IgUg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IAZSDQALCyAAIAsgDCAMQYAFaiINEDsgASAFp2ohASACIAV9IgJC/wBWBEADQCAAIAEgDCANEDsgAUGAAWohASACQoABfSICQv8AVg0ACwsCQCACUA0AIAJCA4MhBEIAIQdCACEDIAJCBFoEQCACQvwAgyEFQgAhAgNAIAsgA6ciAGogACABai0AADoAACALIABBAXIiDWogASANai0AADoAACALIABBAnIiDWogASANai0AADoAACALIABBA3IiAGogACABai0AADoAACADQgR8IQMgAkIEfCICIAVSDQALIARQDQELA0AgCyADpyIAaiAAIAFqLQAAOgAAIANCAXwhAyAHQgF8IgcgBFINAAsLIAxBwAUQBwwBCyACQgODIQVCACEDIAJCBFoEQCACQnyDIQIDQCALIAMgBHynaiABIAOnai0AADoAACALIANCAYQiBiAEfKdqIAEgBqdqLQAAOgAAIAsgA0IChCIGIAR8p2ogASAGp2otAAA6AAAgCyADQgOEIgYgBHynaiABIAanai0AADoAACADQgR8IQMgCUIEfCIJIAJSDQALIAVQDQELA0AgCyADIAR8p2ogASADp2otAAA6AAAgA0IBfCEDIAdCAXwiByAFUg0ACwsgDEHABWokAEEAC6UFAQN/IwBBsAFrIgIkACACIAEoAAA2AgBBBCEDIAIgASgABDYCBCACIAEoAAg2AgggAiABKAAMIgE2AgwDQCACIANBAnRqIgQgA0EDcQR/IAEFIANBAnZB8IgCai0AACABQRh3IgFBCHZB/wFxQYCrAmotAABBCHQgAUH/AXFBgKsCai0AAHIgAUEQdkH/AXFBgKsCai0AAEEQdHIgAUEYdkGAqwJqLQAAQRh0cnMLIARBEGsoAgBzIgE2AgAgA0EBaiIDQSxHDQALIAAgAigCADYCACAAIAIoAgQ2AgQgACACKAIINgIIIAAgAigCDDYCDCAAIAIoAhA2AhAgACACKAIUNgIUIAAgAigCGDYCGCAAIAIoAhw2AhwgACACKAIgNgIgIAAgAigCJDYCJCAAIAIoAig2AiggACACKAIsNgIsIAAgAigCMDYCMCAAIAIoAjQ2AjQgACACKAI4NgI4IAAgAigCPDYCPCAAQUBrIAIoAkA2AgAgACACKAJENgJEIAAgAigCSDYCSCAAIAIoAkw2AkwgACACKAJQNgJQIAAgAigCVDYCVCAAIAIoAlg2AlggACACKAJcNgJcIAAgAigCYDYCYCAAIAIoAmQ2AmQgACACKAJoNgJoIAAgAigCbDYCbCAAIAIoAnA2AnAgACACKAJ0NgJ0IAAgAigCeDYCeCAAIAIoAnw2AnwgACACKAKAATYCgAEgACACKAKEATYChAEgACACKAKIATYCiAEgACACKAKMATYCjAEgACACKAKQATYCkAEgACACKAKUATYClAEgACACKAKYATYCmAEgACACKAKcATYCnAEgACACKAKgATYCoAEgACACKAKkATYCpAEgACACKAKoATYCqAEgACACKAKsATYCrAEgAkGwAWokAAufBAETfyABKAIoIQIgASgCBCEDIAEoAiwhBCABKAIIIQUgASgCMCEGIAEoAgwhByABKAI0IQggASgCECEJIAEoAjghCiABKAIUIQsgASgCPCEMIAEoAhghDSABQUBrIg4oAgAhDyABKAIcIRAgASgCRCERIAEoAiAhEiABKAJIIRMgASgCACEUIAAgASgCJCABKAJMajYCJCAAIBIgE2o2AiAgACAQIBFqNgIcIAAgDSAPajYCGCAAIAsgDGo2AhQgACAJIApqNgIQIAAgByAIajYCDCAAIAUgBmo2AgggACADIARqNgIEIAAgAiAUajYCACABKAIoIQIgASgCBCEDIAEoAiwhBCABKAIIIQUgASgCMCEGIAEoAgwhByABKAI0IQggASgCECEJIAEoAjghCiABKAIUIQsgASgCPCEMIAEoAhghDSAOKAIAIQ4gASgCHCEPIAEoAkQhECABKAIgIREgASgCSCESIAEoAgAhEyAAIAEoAkwgASgCJGs2AkwgACASIBFrNgJIIAAgECAPazYCRCAAQUBrIA4gDWs2AgAgACAMIAtrNgI8IAAgCiAJazYCOCAAIAggB2s2AjQgACAGIAVrNgIwIAAgBCADazYCLCAAIAIgE2s2AiggACABKQJQNwJQIAAgASkCWDcCWCAAIAEpAmA3AmAgACABKQJoNwJoIAAgASkCcDcCcCAAQfgAaiABQfgAakGgCxAGC/AJAR5/IAEoAighAyABKAIEIQQgASgCLCEFIAEoAgghBiABKAIwIQcgASgCDCEIIAEoAjQhCSABKAIQIQogASgCOCELIAEoAhQhDCABKAI8IQ0gASgCGCEOIAFBQGsiDygCACEQIAEoAhwhESABKAJEIRIgASgCICETIAEoAkghFCABKAIAIRUgACABKAIkIAEoAkxqNgIkIAAgEyAUajYCICAAIBEgEmo2AhwgACAOIBBqNgIYIAAgDCANajYCFCAAIAogC2o2AhAgACAIIAlqNgIMIAAgBiAHajYCCCAAIAQgBWo2AgQgACADIBVqNgIAIAEoAighBSABKAIEIQMgASgCLCEGIAEoAgghByABKAIwIQggASgCDCEJIAEoAjQhCiABKAIQIQsgASgCOCEMIAEoAhQhDSABKAI8IQ4gASgCGCEQIA8oAgAhDyABKAIcIQQgASgCRCERIAEoAiAhEiABKAJIIRMgASgCACEUIAAgASgCTCABKAIkazYCTCAAIBMgEms2AkggACARIARrNgJEIABBQGsiBCAPIBBrNgIAIAAgDiANazYCPCAAIAwgC2s2AjggACAKIAlrNgI0IAAgCCAHazYCMCAAIAYgA2s2AiwgAEEoaiIDIAUgFGs2AgAgAEHQAGogACACEAYgAyADIAJBKGoQBiAAQfgAaiACQfgAaiABQfgAahAGIAAgAUHQAGogAkHQAGoQBiAAKAIEIRUgACgCCCEWIAAoAgwhFyAAKAIQIRggACgCFCEZIAAoAhghGiAAKAIcIRsgACgCICEcIAAoAiQhHSADKAIAIQEgACgCUCECIAAoAiwhBSAAKAJUIQYgACgCMCEHIAAoAlghCCAAKAI0IQkgACgCXCEKIAAoAjghCyAAKAJgIQwgACgCPCENIAAoAmQhDiAEKAIAIQ8gACgCaCEQIAAoAkQhESAAKAJsIRIgACgCSCETIAAoAnAhFCAAKAIAIR4gACAAKAJMIh8gACgCdCIgajYCTCAAIBMgFGo2AkggACARIBJqNgJEIAQgDyAQajYCACAAIA0gDmo2AjwgACALIAxqNgI4IAAgCSAKajYCNCAAIAcgCGo2AjAgACAFIAZqNgIsIAMgASACajYCACAAICAgH2s2AiQgACAUIBNrNgIgIAAgEiARazYCHCAAIBAgD2s2AhggACAOIA1rNgIUIAAgDCALazYCECAAIAogCWs2AgwgACAIIAdrNgIIIAAgBiAFazYCBCAAIAIgAWs2AgAgACAdQQF0IgEgACgCnAEiAms2ApwBIAAgHEEBdCIDIAAoApgB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QQA2AuABIABBADoA7AFBfwVBAAsgBQRAIAAoAuABIQMDQCAAKALkASIEIANGBEAgABAOIABBADYC4AEgACgC5AEhBEEAIQMLIAAgASAGaiADIAQgA2siAyAFIAZrIgQgAyAESRsiBBANIAAgACgC4AEgBGoiAzYC4AEgBCAGaiIGIAVJDQALCwvoAQIGfwJ+An8gAkIAUgRAIABB4AFqIQggAEHgAGohBCAAKADgAiEFIABBQGshBgNAIAQgBWohB0GAAiAFayIDrSIJIAJaBEAgAqciAwRAIAcgASAD/AoAAAsgACAAKADgAiADajYA4AJBAAwDCyADBEAgByABIAP8CgAACyAAIAAoAOACIANqNgDgAiAGIAYpAAAiCkKAAXw3AAAgACAAKQBIIApC/35WrXw3AEggACAEEDwgBCAIQYAB/AoAACAAIAAoAOACQYABayIFNgDgAiABIANqIQEgAiAJfSICQgBSDQALC0EACwvoBAEJfyAAIAEoAiAiBSABKAIcIgYgASgCGCIHIAEoAhQiCCABKAIQIgkgASgCDCIKIAEoAggiBCABKAIEIgMgASgCACICIAEoAiQiAUETbEGAgIAIakEZdmpBGnVqQRl1akEadWpBGXVqQRp1akEZdWpBGnVqQRl1akEadSABakEZdUETbCACaiICOgAAIAAgAkEQdjoAAiAAIAJBCHY6AAEgACADIAJBGnVqIgNBDnY6AAUgACADQQZ2OgAEIAAgAkEYdkEDcSADQQJ0cjoAAyAAIAQgA0EZdWoiAkENdjoACCAAIAJBBXY6AAcgACACQQN0IANBgICADnFBFnZyOgAGIAAgCiACQRp1aiIEQQt2OgALIAAgBEEDdjoACiAAIARBBXQgAkGAgIAfcUEVdnI6AAkgACAJIARBGXVqIgJBEnY6AA8gACACQQp2OgAOIAAgAkECdjoADSAAIAggAkEadWoiAzoAECAAIAJBBnQgBEGAgOAPcUETdnI6AAwgACADQRB2OgASIAAgA0EIdjoAESAAIAcgA0EZdWoiAkEPdjoAFSAAIAJBB3Y6ABQgACADQRh2QQFxIAJBAXRyOgATIAAgBiACQRp1aiIDQQ12OgAYIAAgA0EFdjoAFyAAIANBA3QgAkGAgIAccUEXdnI6ABYgACAFIANBGXVqIgJBDHY6ABsgACACQQR2OgAa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LQAAczoAACADQQRqIQMgCEEEaiIIIAJHDQALIAdFDQELA0AgBEFAayADaiIAIAAtAAAgASADai0AAHM6AAAgA0EBaiEDIApBAWoiCiAHRw0ACwsgCSAEQUBrIgBCgAEQEBogAEGAARAHIARBwAAQByAEQcABaiQAQQAPCxAKAAuVAQEBfyMAQdABayIDJAAgA0IANwNIIANCADcDQCADQZCtAikDADcDACADQZitAikDADcDCCADQaCtAikDADcDECADQaitAikDADcDGCADQbCtAikDADcDICADQbitAikDADcDKCADQcCtAikDADcDMCADQcitAikDADcDOCADIAEgAhAQGiADIAAQHCADQdABaiQAQQALVwIBfwF+AkBBsLkCKAIAIgGtIACtQgd8Qvj///8fg3wiAkL/////D1gEQCACpyIAPwBBEHRNDQEgABADDQELQdDAAkEwNgIAQX8PC0GwuQIgADYCACABCzoBAn8jAEEgayIDJABBfyEEIAMgAiABEClFBEAgAEGguQIgAxBfIANBIBAHQQAhBAsgA0EgaiQAIAQLBABBbwuiAwIDfwF+IwBB4AJrIgYkACAGIAQgBRBfAn8CQAJAIAAgAksgAyAAIAJrrVZxRQRAIAAgAk8NASADIAIgAGutWA0BCyADpyIFBEAgACACIAX8CgAACyAGQgA3AzggBkIANwMwIAZCADcDKCAGQgA3AyBCICADIANCIFobIQkgA0IgViEFIAAhAgwBCyAGQgA3AzggBkIANwMwIAZCADcDKCAGQgA3AyBCICADIANCIFobIQkgA0IgViEFIANCAFINAEEBDAELIAmnIgcEQCAGQUBrIAIgB/wKAAALQQALIQggBkEgaiIHIAcgCUIgfCAEQRBqIgRCACAGQdS5AigCABEPABogBkHgAGogB0G8uQIoAgARAQAaAkAgCA0AIAmnIgdFDQAgACAGQUBrIAf8CgAACyAGQSBqQcAAEAcgBQRAIAAgCaciBWogAiAFaiADIAl9IARCASAGQdS5AigCABEPABoLIAZBIBAHIAZB4ABqIgIgACADQcC5AigCABEAABogAiABQcS5AigCABEBABogAkGAAhAHIAZB4AJqJABBAAuHGAEOf0H/ACECA0AgACABQQF0aiIDIAMuAQQiBCADLgEAIgZqIgXBQb+dAWxBGnVB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IAEgA6dqLQAAOgAAIANCAXwhAyAHQgF8IgcgBlINAAsLIAAgCyAMIAxBgAJqIg0QTyABIAWnaiEBIAIgBX0iAkI/VgRAA0AgACABIAwgDRBPIAFBQGshASACQkB8IgJCP1YNAAsLAkAgAlANACACQgODIQRCACEHQgAhAyACQgRaBEAgAkI8gyEFQgAhAgNAIAsgA6ciAGogACABai0AADoAACALIABBAXIiDWogASANai0AADoAACALIABBAnIiDWogASANai0AADoAACALIABBA3IiAGogACABai0AADoAACADQgR8IQMgAkIEfCICIAVSDQALIARQDQELA0AgCyADpyIAaiAAIAFqLQAAOgAAIANCAXwhAyAHQgF8IgcgBFINAAsLIAxBoAIQBwwBCyACQgODIQVCACEDIAJCBFoEQCACQnyDIQIDQCALIAMgBHynaiABIAOnai0AADoAACALIANCAYQiBiAEfKdqIAEgBqdqLQAAOgAAIAsgA0IChCIGIAR8p2ogASAGp2otAAA6AAAgCyADQgOEIgYgBHynaiABIAanai0AADoAACADQgR8IQMgCUIEfCIJIAJSDQALIAVQDQELA0AgCyADIAR8p2ogASADp2otAAA6AAAgA0IBfCEDIAdCAXwiByAFUg0ACwsgDEGgAmokAAsEAEEYC+kDAQJ/QX8hBQJAIAJBwABLDQAgA0HBAGsiBEFASQ0AAkAgAUEAIAIbRQRAIARB/wFxQb8BTQRAEAoACyAAQUBrQQBBpQL8CwAgAEL5wvibkaOz8NsANwA4IABC6/qG2r+19sEfNwAwIABCn9j52cKR2oKbfzcAKCAAQtGFmu/6z5SH0QA3ACAgAELx7fT4paf9p6V/NwAYIABCq/DT9K/uvLc8NwAQIABCu86qptjQ67O7fzcACCAAIAOtQoiS95X/zPmE6gCFNwAADAELAn8jAEGAAWsiBCQAAkAgA0HBAGtB/wFxQb8BTQ0AIAFFDQAgAkHBAGtB/wFxQb8BTQ0AIABBQGtBAEGlAvwLACAAQvnC+JuRo7Pw2wA3ADggAELr+obav7X2wR83ADAgAEKf2PnZwpHagpt/NwAoIABC0YWa7/rPlIfRADcAICAAQvHt9Pilp/2npX83ABggAEKr8NP0r+68tzw3ABAgAEK7zqqm2NDrs7t/NwAIIAAgA60g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GiABKAAUIRsgASgAGCEcIAEoABwhLCABKAAgIS0gASgAJCEuIAEoACghLyABKAAsITAgASgAMCExIAEoADQhMiABKAA4ITMgASgAPCE0IAUgASgAACAIICpqczYAACAFIDQgECAdanM2ADwgBSAzIBcgHmpzNgA4IAUgMiASIBhqczYANCAFIDEgDSATanM2ADAgBSAwIBEgH2pzNgAsIAUgLyAMICBqczYAKCAFIC4gDyAhanM2ACQgBSAtIAsgImpzNgAgIAUgLCAHICNqczYAHCAFIBwgBiAkanM2ABggBSAbIAIgJWpzNgAUIAUgGiAEICZqczYAECAFIBkgFCAnanM2AAwgBSAVIA4gKGpzNgAIIAUgFiAKIClqczYABCASIBNBAWoiE0VqIRIgA0LAAFgEQCADQj9YBEAgA6chAUEAIQQDQCAEICtqIAQgBWotAAA6AAAgBEEBaiIEIAFJDQALCyAAIBI2AjQgACATNgIwBSABQUBrIQEgBUFAayECIANCQHwhAwwBCwsLCAAgAEEQEBUL0QYBCn8jAEGgAmsiAiQAIAAoABwhBCAAKAAYIQUgACgAFCEGIAAoABAhByAAKAAEIQggACgACCEJIAAoAAwhCiAAKAAAIQsgAiABKQJ4NwOYAiACIAEpAnA3A5ACIAIgASkCYDcD8AEgAiABKQJoNwP4ASACIAEpAnA3A+ABIAIgASkCeDcD6AEgAkGAAmoiAyACQfABaiACQeABahAFIAEgAikCiAI3AnggASACKQKAAjcCcCACIAEpAlA3A9ABIAIgASkCWDcD2AEgAiABKQJgNwPAASACIAEpAmg3A8gBIAMgAkHQAWogAkHAAWoQBSABIAIpAogCNwJoIAEgAikCgAI3AmAgAiABQUBrIgApAgA3A7ABIAIgASkCSDcDuAEgAiABKQJQNwOgASACIAEpAlg3A6gBIAMgAkGwAWogAkGgAWoQBSABIAIpAogCNwJYIAEgAikCgAI3AlAgAiABKQIwNwOQASACIAEpAjg3A5gBIAIgACkCADcDgAEgAiABKQJINwOIASADIAJBkAFqIAJBgAFqEAUgASACKQKIAjcCSCAAIAIpAoACNwIAIAIgASkCIDcDcCACIAEpAig3A3ggAiABKQIwNwNgIAIgASkCODcDaCADIAJB8ABqIAJB4ABqEAUgASAC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IiAKIAUgBBAGIAJBkANqIgEgByADEAYgAkG4A2oiBiADIAQQBiAFIAoQIiAKIAUgBBAGIAEgByADEAYgBiADIAQQBiAFIAoQIiAKIAUgBBAGIAEgByADEAYgBiADIAQQBiAFIAoQIiAAIAUgBBAGIAggByADEAYgCSADIAQQBiALIAUgBxAGQQAhAQNAIAJBCGoiBiABQQF2IAJBoAJqIAFqLAAAEHYgAkGAAWoiBSAAIAYQWSAAIAUgBBAGIAggByADEAYgCSADIAQQBiALIAUgBxAGIAFBPkkgAUECaiEBDQALIAJB4ANqJAALYgEDfyMAQbABayICJAAgAkHgAGoiAyABQdAAahBEIAJBMGoiBCABIAMQBiACIAFBKGogAxAGIAAgAhAaIAJBkAFqIAQQGiAAIAAtAB8gAi0AkAFBB3RzOgAfIAJBsAFqJAALyggBA38jAEHAAWsiAiQAIAJBkAFqIgQgARAEIAJB4ABqIgMgBBAEIAMgAxAEIAMgASADEAYgBCAEIAMQBiACQTBqIgEgBBAEIAMgAyABEAYgASADEAQgASABEAQgASABEAQgASABEAQgASABEAQgAyABIAMQBiABIAMQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEgAxAGIAIgARAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAEgAiABEAYgASABEAQgASABEAQgASABEAQgASABEAQgASABEAQgASABEAQgASABEAQgASABEAQgASABEAQgASABEAQgAyABIAMQBiABIAMQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEQBCABIAEgAxAGIAIgARAEQQEhAQNAIAIgAhAEIAFBAWoiAUHkAEcNAAsgAkEwaiIBIAIgARAGIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAEgARAEIAJB4ABqIgMgASADEAYgAyADEAQgAyADEAQgAyADEAQgAyADEAQgAyADEAQgACADIAJBkAFqEAYgAkHAAWokAAv8AgIDfwF+IwBB4ABrIgYkACAGIAQgBRBfIAZBIGoiBUIgIARBEGoiBCAGQdC5AigCABERABoCfyACIAEgAyAFQbi5AigCABEWAARAIAZBIBAHQX8MAQsCQCAARQRAIAZBIBAHIAZBIGpBwAAQBwwBCwJAAkACQAJAIAAgAUkgAyABIABrrVZxRQRAIAAgAU0NASADIAAgAWutWA0BCyADpyICBEAgACABIAL8CgAACyAAIQEMAQsgA1ANAQsgBkFAayEFQiAgAyADQiBaGyIJpyICRSIHRQRAIAUgASAC/AoAAAsgBkEgaiIIIAggCUIgfCAEQgAgBkHUuQIoAgARDwAaIAdFBEAgACAFIAL8CgAACyAGQSBqQcAAEAcgA0IhVA0BIAAgAmogASACaiADIAl9IARCASAGQdS5AigCABEPABoMAQsgBkEgaiIAIABCICAEQgAgBkHUuQIoAgARDwAaIABBwAAQBwsg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BEAgAxAOIANBADYC4AEgAygC5AEhBEEAIQULIAMgASAGaiAFIAQgBWsiBSAHIAZrIgQgBCAFSxsiBBANIAMgAygC4AEgBGoiBTYC4AEgBCAGaiIGIAdJDQALCyADIAAQNhogA0GAAhAHIANBgAJqJABBAAuxAQEBfyMAQRBrIgIgADYCDCACIAE2AghBACEAIAJBADsBBgNAIAIgAi8BBiACKAIMIABqLQAAIAIoAgggAGotAABzcjsBBiACIAIvAQYgAEEBciIBIAIoAgxqLQAAIAIoAgggAWotAABzcjsBBiAAQQJqIgBBIEcNAAsgAiACLwEGOwEGIAIgAi8BBkEBazsBBiACQeDEAi8BAEECdiACLwEGQQ92czsBBiACLwEGQQFrCzQBAX8jAEEgayICJAAgACACEGUgAEHoAGoiACACQiAQNyAAIAEQZSACQSAQByACQSBqJAAL4gcBCX8jAEHgAGsiAyQAAkACQCACQcEATwRAIABCADcDICAAQeCzAikDADcDACAAQeizAikDADcDCCAAQfCzAikDADcDECAAQfizAikDADcDGCAAIAEgAq0QNyAAIAMQZUEgIQIgAyEBDAELIAENACACDQELIABCADcDICAAQeCzAikDADcDACAAQeizAikDADcDCCAAQfCzAikDADcDECAAQfizAikDADcDGCADQrbs2LHjxo2bNjcDWCADQrbs2LHjxo2bNjcDUCADQrbs2LHjxo2bNjcDSCADQrbs2LHjxo2bNjcDQCADQrbs2LHjxo2bNjcDOCADQrbs2LHjxo2bNjcDMCADQrbs2LHjxo2bNjcDKCADQrbs2LHjxo2bNjcDIAJAIAJFDQAgAkEDcSEJIAJBBE8EQCACQfwAcSEGA0AgA0EgaiIHIARqIgUgBS0AACABIARqLQAAczoAACAHIARBAXIiBWoiCyALLQAAIAEgBWotAABzOgAAIAcgBEECciIFaiILIAstAAAgASAFai0AAHM6AAAgByAEQQNyIgVqIgcgBy0AACABIAVqLQAAczoAACAEQQRqIQQgCEEEaiIIIAZHDQALIAlFDQELA0AgA0EgaiAEaiIIIAgtAAAgASAEai0AAHM6AAAgBEEBaiEEIApBAWoiCiAJRw0ACwsgACADQSBqQsAAEDcgAEHoAGoiCSIAQgA3AyAgAEHgswIpAwA3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EAghAyAAIAAoAmwQCDYCbCAAIAM2AmggACACNgJkIAAgATYCYCAAKAJwEAghASAAKAJ0EAghAiAAKAJ4EAghAyAAIAAoAnwQCDYCfCAAIAM2AnggACACNgJ0IAAgATYCcCAAKAKAARAIIQEgACgChAEQCCECIAAoAogBEAghAyAAIAAoAowBEAg2AowBIAAgAzYCiAEgACACNgKEASAAIAE2AoABIAAoApABEAghASAAKAKUARAIIQIgACgCmAEQCCEDIAAgACgCnAEQCDYCnAEgACADNgKYASAAIAI2ApQBIAAgATYCkAEL9xICFX4DfyAAIAAoACwiFkEFdkH///8Aca0gACgAPEEDdq0iAkKDoVZ+IAAzACogADEALEIQhkKAgPwAg4R8IgtCgIBAfSIIQhWHfCIBQoOhVn4gADUAMUIHiEL///8AgyIDQtOMQ34gACgAFyIXQRh2rSAAMQAbQgiGhCAAMQAcQhCGhEICiEL///8Ag3wgACgANCIYQQR2Qf///wBxrSIEQuf2J358IBZBGHatIAAxADBCCIaEIAAxADFCEIaEQgKIQv///wCDIgVC0asIfnwgADUAOUIGiEL///8AgyIGQpPYKH58IBhBGHatIAAxADhCCIaEIAAxADlCEIaEQgGIQv///wCDIglCmNocfnwiB3wgB0KAgEB9IhFCgICAf4N9IBdBBXZB////AHGtIANC5/YnfnwgBEKY2hx+fCAFQtOMQ358IAlCk9gofnwgA0KY2hx+IAAzABUgADEAF0IQhkKAgPwAg4R8IARCk9gofnwgBULn9id+fCIHQoCAQH0iCkIViHwiDEKAgEB9Ig1CFYd8Ig8gD0KAgEB9Ig9CgICAf4N9IAwgAULRqwh+fCANQoCAgH+DfSALIAhCgICAf4N9IAJC0asIfiAAKAAkIhZBGHatIAAxAChCCIaEIAAxAClCEIaEQgOIfCAGQoOhVn58IBZBBnZB////AHGtIAJC04xDfnwgBkLRqwh+fCAJQoOhVn58IgxCgIBAfSINQhWHfCIIQoCAQH0iDkIVh3wiC0KDoVZ+fCAHIApCgICA////A4N9IANCk9gofiAAKAAPIhZBGHatIAAxABNCCIaEIAAxABRCEIaEQgOIfCAFQpjaHH58IBZBBnZB////AHGtIAVCk9gofnwiCkKAgEB9IhJCFYh8IgdCgIBAfSIQQhWIfCABQtOMQ358IAtC0asIfnwgCCAOQoCAgH+DfSIIQoOhVn58Ig5CgIBAfSITQhWHfCIUQoCAQH0iFUIVh3wgFCAVQoCAgH+DfSAOIBNCgICAf4N9IAcgEEKAgID///////8Ag30gAULn9id+fCALQtOMQ358IAhC0asIfnwgDCANQoCAgH+DfSAEQoOhVn4gACgAHyIWQRh2rSAAMQAjQgiGhCAAMQAkQhCGhEIBiEL///8Ag3wgAkLn9id+fCAGQtOMQ358IAlC0asIfnwgFkEEdkH///8Aca0gA0KDoVZ+fCAEQtGrCH58IAJCmNocfnwgBkLn9id+fCAJQtOMQ358IgxCgIBAfSINQhWHfCIOQoCAQH0iEEIVh3wiB0KDoVZ+fCAKIBJCgICA////AYN9IAFCmNocfnwgC0Ln9id+fCAIQtOMQ358IAdC0asIfnwgDiAQQoCAgH+DfSIKQoOhVn58Ig5CgIBAfSISQhWHfCIQQoCAQH0iE0IVh3wgECATQoCAgH+DfSAOIBJCgICAf4N9IAFCk9gofiAAKAAKIhZBGHatIAAxAA5CCIaEIAAxAA9CEIaEQgGIQv///wCDfCALQpjaHH58IAhC5/YnfnwgB0LTjEN+fCAKQtGrCH58IAwgDUKAgIB/g30gA0LRqwh+IAA1ABxCB4hC////AIN8IARC04xDfnwgBUKDoVZ+fCACQpPYKH58IAZCmNocfnwgCULn9id+fCARQhWHfCIBQoCAQH0iA0IVh3wiAkKDoVZ+fCAWQQR2Qf///wBxrSALQpPYKH58IAhCmNocfnwgB0Ln9id+fCAKQtOMQ358IAJC0asIfnwiBEKAgEB9IgVCFYd8IgZCgIBAfSIJQhWHfCAGIAEgA0KAgIB/g30gD0IVh3wiA0KAgEB9IgtCFYciAUKDoVZ+fCAJQoCAgH+DfSABQtGrCH4gBHwgBUKAgIB/g30gCEKT2Ch+IAA1AAdCB4hC////AIN8IAdCmNocfnwgCkLn9id+fCACQtOMQ358IAdCk9gofiAAKAACIhZBGHatIAAxAAZCCIaEIAAxAAdCEIaEQgKIQv///wCDfCAKQpjaHH58IAJC5/YnfnwiBEKAgEB9IgVCFYd8IgZCgIBAfSIJQhWHfCAGIAFC04xDfnwgCUKAgIB/g30gAULn9id+IAR8IAVCgICAf4N9IBZBBXZB////AHGtIApCk9gofnwgAkKY2hx+fCACQpPYKH4gADMAACAAMQACQhCGQoCA/ACDhHwiAkKAgEB9IgRCFYd8IgVCgIBAfSIGQhWHfCABQpjaHH4gBXwgBkKAgIB/g30gAiAEQoCAgH+DfSABQpPYKH58IgFCFYd8IgVCFYd8IgZCFYd8IglCFYd8IghCFYd8IgdCFYd8IgpCFYd8IhFCFYd8IgxCFYd8Ig1CFYd8Ig9CFYcgAyALQoCAgH+DfXwiBEIVhyICQpPYKH4gAUL///8Ag3wiAzwAACAAIANCCIg8AAEgACACQpjaHH4gBUL///8Ag3wgA0IVh3wiAUILiDwABCAAIAFCA4g8AAMgACADQhCIQh+DIAFCBYaEPAACIAAgAkLn9id+IAZC////AIN8IAFCFYd8IgNCBog8AAYgACADQgKGIAFCgIDgAINCE4iEPAAFIAAgAkLTjEN+IAlC////AIN8IANCFYd8IgFCCYg8AAkgACABQgGIPAAIIAAgAUIHhiADQoCA/wCDQg6IhDwAByAAIAJC0asIfiAIQv///wCDfCABQhWHfCIDQgyIPAAMIAAgA0IEiDwACyAAIANCBIYgAUKAgPgAg0IRiIQ8AAogACACQoOhVn4gB0L///8Ag3wgA0IVh3wiAUIHiDwADiAAIAFCAYYgA0KAgMAAg0IUiIQ8AA0gACAKQv///wCDIAFCFYd8IgJCCog8ABEgACACQgKIPAAQIAAgAkIGhiABQoCA/gCDQg+IhDwADyAAIBFC////AIMgAkIVh3wiAUINiDwAFCAAIAFCBYg8ABMgACAMQv///wCDIAFCFYd8IgM8ABUgACABQgOGIAJCgIDwAINCEoiEPAASIAAgA0IIiDwAFiAAIA1C////AIMgA0IVh3wiAkILiDwAGSAAIAJCA4g8ABggACADQhCIQh+DIAJCBYaEPAAXIAAgD0L///8AgyACQhWHfCIBQgaIPAAbIAAgAUIChiACQoCA4ACDQhOIhDwAGiAAIAFCFYciAyAEQv///wCDfCICQhGIPAAfIAAgAkIJiDwAHiAAIAJCB4YgAUKAgP8Ag0IOiIQ8ABwgACADpyAEp2pBAXatPAAdC/gBAQp/A0AgBCAAIANqLQAAIgEgA0GQE2oiAi0AAHNyIQQgCiABIAItAMABc3IhCiAJIAEgAi0AoAFzciEJIAggASACLQCAAXNyIQggByABIAItAGBzciEHIAYgASACQUBrLQAAc3IhBiAFIAEgAi0AIHNyIQUgA0EBaiIDQR9HDQALIAogAC0AH0H/AHEiAEH/AHMiAXJB/wFxQQFrIAEgCXJB/wFxQQFrIAEgCHJB/wFxQQFrIAcgAEH6AHNyQf8BcUEBayAGIABBBXNyQf8BcUEBayAAIAVyQf8BcUEBayAAIARyQf8BcUEBa3JycnJyckEIdkEBcQvgCQEefyABKAIoIQMgASgCBCEEIAEoAiwhBSABKAIIIQYgASgCMCEHIAEoAgwhCCABKAI0IQkgASgCECEKIAEoAjghCyABKAIUIQwgASgCPCENIAEoAhghDiABQUBrIg8oAgAhECABKAIcIREgASgCRCESIAEoAiAhEyABKAJIIRQgASgCACEVIAAgASgCJCABKAJMajYCJCAAIBMgFGo2AiAgACARIBJqNgIcIAAgDiAQajYCGCAAIAwgDWo2AhQgACAKIAtqNgIQIAAgCCAJajYCDCAAIAYgB2o2AgggACAEIAVqNgIEIAAgAyAVajYCACABKAIoIQUgASgCBCEDIAEoAiwhBiABKAIIIQcgASgCMCEIIAEoAgwhCSABKAI0IQogASgCECELIAEoAjghDCABKAIUIQ0gASgCPCEOIAEoAhghECAPKAIAIQ8gASgCHCEEIAEoAkQhESABKAIgIRIgASgCSCETIAEoAgAhFCAAIAEoAkwgASgCJGs2AkwgACATIBJrNgJIIAAgESAEazYCRCAAQUBrIgQgDyAQazYCACAAIA4gDWs2AjwgACAMIAtrNgI4IAAgCiAJazYCNCAAIAggB2s2AjAgACAGIANrNgIsIABBKGoiAyAFIBRrNgIAIABB0ABqIAAgAhAGIAMgAyACQShqEAYgAEH4AGogAkHQAGogAUH4AGoQBiABKAJQIRUgASgCVCEWIAEoAlghFyABKAJcIRggASgCYCEZIAEoAmQhGiABKAJoIRsgASgCbCEcIAEoAnAhHSABKAJ0IR4gAygCACEBIAAoAlAhAiAAKAIsIQUgACgCVCEGIAAoAjAhByAAKAJYIQggACgCNCEJIAAoAlwhCiAAKAI4IQsgACgCYCEMIAAoAjwhDSAAKAJkIQ4gBCgCACEPIAAoAmghECAAKAJEIREgACgCbCESIAAoAkghEyAAKAJwIRQgACAAKAJMIh8gACgCdCIgajYCTCAAIBMgFGo2AkggACARIBJqNgJEIAQgDyAQajYCACAAIA0gDmo2AjwgACALIAxqNgI4IAAgCSAKajYCNCAAIAcgCGo2AjAgACAFIAZqNgIsIAMgASACajYCACAAICAgH2s2AiQgACAUIBNrNgIgIAAgEiARazYCHCAAIBAgD2s2AhggACAOIA1rNgIUIAAgDCALazYCECAAIAogCWs2AgwgACAIIAdrNgIIIAAgBiAFazYCBCAAIAIgAWs2AgAgACAeQQF0IgEgACgCnAEiAms2ApwBIAAgHUEBdCIDIAAoApgBIgRrNgKYASAAIBxBAXQiBSAAKAKUASIGazYClAEgACAbQQF0IgcgACgCkAEiCGs2ApABIAAgGkEBdCIJIAAoAowBIgprNgKMASAAIBlBAXQiCyAAKAKIASIMazYCiAEgACAYQQF0Ig0gACgChAEiDms2AoQBIAAgF0EBdCIPIAAoAoABIhBrNgKAASAAIBZBAXQiESAAKAJ8IhJrNgJ8IAAgFUEBdCITIAAoAngiFGs2AnggACADIARqNgJwIAAgBSAGajYCbCAAIAcgCGo2AmggACAJIApqNgJkIAAgCyAMajYCYCAAIA0gDmo2AlwgACAPIBBqNgJYIAAgESASajYCVCAAIBMgFGo2AlAgACABIAJqNgJ0C+UBAQJ/IAJBAEchAwJAAkACQCAAQQNxRQ0AIAJFDQAgAUH/AXEhBANAIAAtAAAgBEYNAiACQQFrIgJBAEchAyAAQQFqIgBBA3FFDQEgAg0ACwsgA0UNAQJAIAFB/wFxIgMgAC0AAEYNACACQQRJDQAgA0GBgoQIbCEDA0BBgIKECCAAKAIAIANzIgRrIARyQYCBgoR4cUGAgYKEeEcNAiAAQQRqIQAgAkEEayICQQNLDQALCyACRQ0BCyABQf8BcSEBA0AgASAALQAARgRAIAAPCyAAQQFqIQAgAkEBayICDQALC0EACxYAIAFBIBAVIAAgAUHMuQIoAgARAQALogQCDn4Kf0EAQYCAgAggAC0AUBshFiAAKAIkIRIgACgCICETIAAoAhwhFCAAKAIYIRUgACgCFCERIAAoAhAiF60hDyAAKAIMIhitIQ0gACgCCCIZrSELIAAoAgQiGq0hCSAaQQVsrSEQIBlBBWytIQ4gGEEFbK0hDCAXQQVsrSEKIAA1AgAhCANAIAEoAANBAnZB////H3EgFWqtIgMgDX4gASgAAEH///8fcSARaq0iBCAPfnwgASgABkEEdkH///8fcSAUaq0iBSALfnwgASgACUEGdiATaq0iBiAJfnwgEiAWaiABKAAMQQh2aq0iByAIfnwgAyALfiAEIA1+fCAFIAl+fCAGIAh+fCAHIAp+fCADIAl+IAQgC358IAUgCH58IAYgCn58IAcgDH58IAMgCH4gBCAJfnwgBSAKfnwgBiAMfnwgByAOfnwgAyAKfiAEIAh+fCAFIAx+fCAGIA5+fCAHIBB+fCIDQhqIQv////8Pg3wiBEIaiEL/////D4N8IgVCGohC/////w+DfCIGQhqIQv////8Pg3wiB0IaiKdBBWwgA6dB////H3FqIhFBGnYgBKdB////H3FqIRUgBadB////H3EhFCAGp0H///8fcSETIAenQf///x9xIRIgEUH///8fcSERIAFBEGohASACQhB9IgJCD1YNAAsgACASNgIkIAAgEzYCICAAIBQ2AhwgACAVNgIYIAAgETYCFAvvJgEnfyMAQdAEayIdJABBfyENIABBIGohCEEgIQpBASEFA0AgCkEBayIJQfAUai0AACIHIAggCWotAAAiCXNBAWtBCHUgBXEiBiAIIApBAmsiCmotAAAiDCAKQfAUai0AACIOa0EIdXEgCSAHa0EIdSAFcSALcnIhCyAMIA5zQQFrQQh1IAZxIQUgCg0ACwJAIAtFDQAgABBYDQAgAy0AH0F/c0H/AHEgAy0AASADLQACIAMtAAMgAy0ABCADLQAFIAMtAAYgAy0AByADLQAIIAMtAAkgAy0ACiADLQALIAMtAAwgAy0ADSADLQAOIAMtAA8gAy0AECADLQARIAMtABIgAy0AEyADLQAUIAMtABUgAy0AFiADLQAXIAMtABggAy0AGSADLQAaIAMtABsgAy0AHCADLQAeIAMtAB1xcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcUH/AXNyQQFrQewBIAMtAABrcUF/c0EIdkEBcUUNACADEFgNACAdQYABaiIKIAMQeQ0AIB1BgANqIgsQJSAEBEAgC0HguAJCIhAQGgsgCyAAQiAQEBogCyADQiAQ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HCAAIAcgCSAKc3M2ABggACAOIAsgDHNzNgAUIAAgASAGIAhzczYAEAwBCyABRQ0AIABBACAB/AsACyAFQeABaiQAC6UGARR/IwBB4AFrIgMkACACKAIQIQUgAkFAayIEKAIAIQkgAigCUCEKIAIoAiAhCyACKAIwIQwgASgABCEGIAIoAhQhDSACKAJEIQ4gAigCVCEPIAIoAiQhECACKAI0IREgASgACCEHIAIoAhghEiACKAJIIRMgAigCWCEUIAIoAighFSACKAI4IRYgASgAACEIIAAgASgADCIBIAIoAiwgAigCPHEgAigCHCACKAJcIAIoAkxzc3NzNgAMIAAgByAVIBZxIBIgEyAUc3NzczYACCAAIAYgECARcSANIA4gD3Nzc3M2AAQgACAIIAsgDHEgBSAJIApzc3NzNgAAIAMgAikCWDcD2AEgAyACKQJQNwPQASADIAQpAgA3A7ABIAMgAikCSDcDuAEgAyACKQJQNwOgASADIAIpAlg3A6gBIANBwAFqIgAgA0GwAWogA0GgAWoQBSACIAMpAsgBNwJYIAIgAykCwAE3AlAgAyACKQIwNwOQASADIAIpAjg3A5gBIAMgBCkCADcDgAEgAyACKQJINwOIASAAIANBkAFqIANBgAFqEAUgAiADKQLIATcCSCAEIAMpAsABNwIAIAMgAikCIDcDcCADIAIpAig3A3ggAyACKQIwNwNgIAMgAikCODcDaCAAIANB8ABqIANB4ABqEAUgAiADKQLIATcCOCACIAMpAsABNwIwIAMgAikCEDcDUCADIAIpAhg3A1ggAyACKQIgNwNAIAMgAikCKDcDSCAAIANB0ABqIANBQGsQBSACIAMpAsgBNwIoIAIgAykCwAE3AiAgAyACKQIANwMwIAMgAikCCDcDOCADIAIpAhA3AyAgAyACKQIYNwMoIAAgA0EwaiADQSBqEAUgAiADKQLIATcCGCACIAMpAsABNwIQIAMgAykD0AE3AxAgAyADKQPYATcDGCADIAIpAgA3AwAgAyACKQIINwMIIAAgA0EQaiADEAUgAygCwAEhACADKALEASEEIAMoAsgBIQUgAiABIAMoAswBczYCDCACIAUgB3M2AgggAiAEIAZzNgIEIAIgACAIczYCACADQeABaiQAC6UJAQ1/IwBBoANrIgIkACAAKAAQIQYgACgAFCEHIAAoABghCCAAKAAcIQkgACgABCEEIAAoAAghBSAAKAAMIQogACgAACELIAIgASkCWDcDmAMgAiABKQJQNwOQAyACIAFBQGsiACkCADcD8AIgAiABKQJINwP4AiACIAEpAlA3A+ACIAIgASkCWDcD6AIgAkGAA2oiAyACQfACaiACQeACahAFIAEgAikCiAM3AlggASACKQKAAzcCUCACIAEpAjA3A9ACIAIgASkCODcD2AIgAiAAKQIANwPAAiACIAEpAkg3A8gCIAMgAkHQAmogAkHAAmoQBSABIAIpAogDNwJIIAAgAikCgAM3AgAgAiABKQIgNwOwAiACIAEpAig3A7gCIAIgASkCMDcDoAIgAiABKQI4NwOoAiADIAJBsAJqIAJBoAJqEAUgASACKQKIAzcCOCABIAIpAoADNwIwIAIgASkCEDcDkAIgAiABKQIYNwOYAiACIAEpAiA3A4ACIAIgASkCKDcDiAIgAyACQZACaiACQYACahAFIAEgAikCiAM3AiggASACKQKAAzcCICACIAEpAgA3A/ABIAIgASkCCDcD+AEgAiABKQIQNwPgASACIAEpAhg3A+gBIAMgAkHwAWogAkHgAWoQBSABIAIpAogDNwIYIAEgAikCgAM3AhAgAiACKQOQAzcD0AEgAiACKQOYAzcD2AEgAiABKQIANwPAASACIAEpAgg3A8gBIAMgAkHQAWogAkHAAWoQBSACKAKAAyEMIAIoAoQDIQ0gAigCiAMhDiABIAogAigCjANzNgIMIAEgBSAOczYCCCABIAQgDXM2AgQgASALIAxzNgIAIAIgASkCWDcDmAMgAiABKQJQNwOQAyACIAApAgA3A7ABIAIgASkCSDcDuAEgAiABKQJQNwOgASACIAEpAlg3A6gBIAMgAkGwAWogAkGgAWoQBSABIAIpAogDNwJYIAEgAikCgAM3AlAgAiABKQIwNwOQASACIAEpAjg3A5gBIAIgACkCADcDgAEgAiABKQJINwOIASADIAJBkAFqIAJBgAFqEAUgASACKQKIAzcCSCAAIAIpAoADNwIAIAIgASkCIDcDcCACIAEpAig3A3ggAiABKQIwNwNgIAIgASkCODcDaCADIAJB8ABqIAJB4ABqEAUgASACKQKIAzcCOCABIAIpAoADNwIwIAIgASkCEDcDUCACIAEpAhg3A1ggAiABKQIgNwNAIAIgASkCKDcDSCADIAJB0ABqIAJBQGsQBSABIAIpAogDNwIoIAEgAikCgAM3AiAgAiABKQIANwMwIAIgASkCCDcDOCACIAEpAhA3AyAgAiABKQIYNwMoIAMgAkEwaiACQSBqEAUgASACKQKIAzcCGCABIAIpAoADNwIQIAIgAikDkAM3AxAgAiACKQOYAzcDGCACIAEpAgA3AwAgAiABKQIINwMIIAMgAkEQaiACEAUgAigCgAMhACACKAKEAyEEIAIoAogDIQUgASAJIAIoAowDczYCDCABIAUgCHM2AgggASAEIAdzNgIEIAEgACAGczYCACACQaADaiQAC94UARV/IwBBoAZrIgMkACABKAAEIQggASgACCEJIAEoAAwhCiABKAAQIQsgASgAFCEMIAEoABghDSABKAAcIQ4gACgABCEPIAAoAAghECAAKAAMIREgACgAECESIAAoABQhEyAAKAAYIRQgACgAHCEVIAEoAAAhFiACQUBrIgEgACgAACIAQYCChBBzNgIAIAJClcTcyYWy+rziADcCOCACQoCChJCwoIGEDTcCMCACQqCixJG0rq2UXTcCKCACQtv74KjVzfCXcTcCICACIAAgFnMiFjYCACACIBVB8+qi6X1zNgJcIAIgFEGgosSRBHM2AlggAiATQe2Ev4l/czYCVCACIBJB2/vgqAVzNgJQIAIgEUGQ0+eTBnM2AkwgAiAQQZXE3MkFczYCSCACIA9Bg4qg6ABzNgJEIAIgDiAVcyIONgIcIAIgDSAUcyINNgIYIAIgDCATcyIMNgIUIAIgCyAScyILNgIQIAIgCiARcyIKNgIMIAIgCSAQcyIJNgIIIAIgCCAPcyIXNgIEQQAhCANAIAMgAikCWDcDmAYgAyACKQJQNwOQBiADIAEpAgA3A/AFIAMgASkCCDcD+AUgAyACKQJQNwPgBSADIAIpAlg3A+gFIANBgAZqIgQgA0HwBWogA0HgBWoQBSACIAMpAogGNwJYIAIgAykCgAY3AlAgAyACKQIwNwPQBSADIAIpAjg3A9gFIAMgASkCADcDwAUgAyABKQIINwPIBSAEIANB0AVqIANBwAVqEAUgASADKQKIBjcCCCABIAMpAoAGNwIAIAMgAikCIDcDsAUgAyACKQIoNwO4BSADIAIpAjA3A6AFIAMgAikCODcDqAUgBCADQbAFaiADQaAFahAFIAIgAykCiAY3AjggAiADKQKABjcCMCADIAIpAhA3A5AFIAMgAikCGDcDmAUgAyACKQIgNwOABSADIAIpAig3A4gFIAQgA0GQBWogA0GABWoQBSACIAMpAogGNwIoIAIgAykCgAY3AiAgAyACKQIANwPwBCADIAIpAgg3A/gEIAMgAikCEDcD4AQgAyACKQIYNwPoBCAEIANB8ARqIANB4ARqEAUgAiADKQKIBjcCGCACIAMpAoAGNwIQIAMgAykDkAY3A9AEIAMgAykDmAY3A9gEIAMgAikCADcDwAQgAyACKQIINwPIBCAEIANB0ARqIANBwARqEAUgAygCgAYhBSADKAKEBiEGIAMoAogGIQcgAiADKAKMBiARczYCDCACIAcgEHM2AgggAiAGIA9zNgIEIAIgACAFczYCACADIAIpAlg3A5gGIAMgAikCUDcDkAYgAyABKQIANwOwBCADIAEpAgg3A7gEIAMgAikCWDcDqAQgAyACKQJQNwOgBCAEIANBsARqIANBoARqEAUgAiADKQKIBjcCWCACIAMpAoAGNwJQIAMgAikCMDcDkAQgAyACKQI4NwOYBCADIAEpAgA3A4AEIAMgASkCCDcDiAQgBCADQZAEaiADQYAEahAFIAEgAykCiAY3AgggASADKQKABjcCACADIAIpAiA3A/ADIAMgAikCKDcD+AMgAyACKQIwNwPgAyADIAIpAjg3A+gDIAQgA0HwA2ogA0HgA2oQBSACIAMpAogGNwI4IAIgAykCgAY3AjAgAyACKQIQNwPQAyADIAIpAhg3A9gDIAMgAikCIDcDwAMgAyACKQIoNwPIAyAEIANB0ANqIANBwANqEAUgAiADKQKIBjcCKCACIAMpAoAGNwIgIAMgAikCADcDsAMgAyACKQIINwO4AyADIAIpAhA3A6ADIAMgAikCGDcDqAMgBCADQbADaiADQaADahAFIAIgAykCiAY3AhggAiADKQKABjcCECADIAMpA5AGNwOQAyADIAMpA5gGNwOYAyADIAIpAgA3A4ADIAMgAikCCDcDiAMgBCADQZADaiADQYADahAFIAMoAoAGIQUgAygChAYhBiADKAKIBiEHIAIgAygCjAYgFXM2AgwgAiAHIBRzNgIIIAIgBiATczYCBCACIAUgEnM2AgAgAyACKQJYNwOYBiADIAIpAlA3A5AGIAMgASkCADcD8AIgAyABKQIINwP4AiADIAIpAlg3A+gCIAMgAikCUDcD4AIgBCADQfACaiADQeACahAFIAIgAykCiAY3AlggAiADKQKABjcCUCADIAIpAjA3A9ACIAMgAikCODcD2AIgAyABKQIANwPAAiADIAEpAgg3A8gCIAQgA0HQAmogA0HAAmoQBSABIAMpAogGNwIIIAEgAykCgAY3AgAgAyACKQIgNwOwAiADIAIpAig3A7gCIAMgAikCMDcDoAIgAyACKQI4NwOoAiAEIANBsAJqIANBoAJqEAUgAiADKQKIBjcCOCACIAMpAoAGNwIwIAMgAikCEDcDkAIgAyACKQIYNwOYAiADIAIpAiA3A4ACIAMgAikCKDcDiAIgBCADQZACaiADQYACahAFIAIgAykCiAY3AiggAiADKQKABjcCICADIAIpAgA3A/ABIAMgAikCCDcD+AEgAyACKQIQNwPgASADIAIpAhg3A+gBIAQgA0HwAWogA0HgAWoQBSACIAMpAogGNwIYIAIgAykCgAY3AhAgAyADKQOQBjcD0AEgAyADKQOYBjcD2AEgAyACKQIANwPAASADIAIpAgg3A8gBIAQgA0HQAWogA0HAAWoQBSADKAKABiEFIAMoAoQGIQYgAygCiAYhByACIAMoAowGIApzNgIMIAIgByAJczYCCCACIAYgF3M2AgQgAiAFIBZzNgIAIAMgAikCWDcDmAYgAyACKQJQNwOQBiADIAEpAgA3A7ABIAMgASkCCDcDuAEgAyACKQJYNwOoASADIAIpAlA3A6ABIAQgA0GwAWogA0GgAWoQBSACIAMpAogGNwJYIAIgAykCgAY3AlAgAyACKQIwNwOQASADIAIpAjg3A5gBIAMgASkCADcDgAEgAyABKQIINwOIASAEIANBkAFqIANBgAFqEAUgASADKQKIBjcCCCABIAMpAoAGNwIAIAMgAikCIDcDcCADIAIpAig3A3ggAyACKQIwNwNgIAMgAikCODcDaCAEIANB8ABqIANB4ABqEAUgAiADKQKIBjcCOCACIAMpAoAGNwIwIAMgAikCEDcDUCADIAIpAhg3A1ggAyACKQIgNwNAIAMgAikCKDcDSCAEIANB0ABqIANBQGsQBSACIAMpAogGNwIoIAIgAykCgAY3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BSACIAMpAogCNwJYIAIgAykCgAI3AlAgAyACKQIwNwOQASADIAIpAjg3A5gBIAMgACkCADcDgAEgAyACKQJINwOIASAEIANBkAFqIANBgAFqEAUgAiADKQKIAjcCSCAAIAMpAoACNwIAIAMgAikCIDcDcCADIAIpAig3A3ggAyACKQIwNwNgIAMgAikCODcDaCAEIANB8ABqIANB4ABqEAUgAiADKQKIAjcCOCACIAMpAoACNwIwIAMgAikCEDcDUCADIAIpAhg3A1ggAyACKQIgNwNAIAMgAikCKDcDSCAEIANB0ABqIANBQGsQBSACIAMpAogCNwIoIAIgAykCgAI3AiAgAyACKQIANwMwIAMgAikCCDcDOCADIAIpAhA3AyAgAyACKQIYNwMoIAQgA0EwaiADQSBqEAUgAiADKQKIAjcCGCACIAMpAoACNwIQIAMgAykDkAI3AxAgAyADKQOYAjcDGCADIAIpAgA3AwAgAyACKQIINwMIIAQgA0EQaiADEAUgAiADKQKIAjcCCCACIAMpAoACNwIAIAIgByACKAIMczYCDCACIAYgAigCCHM2AgggAiAFIAIoAgRzNgIEIAIgECACKAIAczYCACAAIAggACgCAHM2AgAgAiALIAIoAkRzNgJEIAIgDiACKAJIczYCSCACIAEgAigCTHM2AkwgA0GgAmokAAuZDQESfyMAQaAEayICJAAgACgAPCEEIAAoADghBSAAKAA0IQYgACgAMCEHIAAoACAhCCAAKAAkIQkgACgAKCEKIAAoACwhCyAAKAAcIQwgACgAGCENIAAoABQhDiAAKAAQIQ8gACgABCEQIAAoAAghESAAKAAMIRIgACgAACETIAIgASkCeDcDmAQgAiABKQJwNwOQBCACIAEpAmA3A/ADIAIgASkCaDcD+AMgAiABKQJwNwPgAyACIAEpAng3A+gDIAJBgARqIgMgAkHwA2ogAkHgA2oQBSABIAIpAogENwJ4IAEgAikCgAQ3AnAgAiABKQJQNwPQAyACIAEpAlg3A9gDIAIgASkCYDcDwAMgAiABKQJoNwPIAyADIAJB0ANqIAJBwANqEAUgASACKQKIBDcCaCABIAIpAoAENwJgIAIgAUFAayIAKQIANwOwAyACIAEpAkg3A7gDIAIgASkCUDcDoAMgAiABKQJYNwOoAyADIAJBsANqIAJBoANqEAUgASACKQKIBDcCWCABIAIpAoAENwJQIAIgASkCMDcDkAMgAiABKQI4NwOYAyACIAApAgA3A4ADIAIgASkCSDcDiAMgAyACQZADaiACQYADahAFIAEgAikCiAQ3AkggACACKQKABDcCACACIAEpAiA3A/ACIAIgASkCKDcD+AIgAiABKQIwNwPgAiACIAEpAjg3A+gCIAMgAkHwAmogAkHgAmoQBSABIAIpAogENwI4IAEgAikCgAQ3AjAgAiABKQIQNwPQAiACIAEpAhg3A9gCIAIgASkCIDcDwAIgAiABKQIoNwPIAiADIAJB0AJqIAJBwAJqEAUgASACKQKIBDcCKCABIAIpAoAENwIgIAIgASkCADcDsAIgAiABKQIINwO4AiACIAEpAhA3A6ACIAIgASkCGDcDqAIgAyACQbACaiACQaACahAFIAEgAikCiAQ3AhggASACKQKABDcCECACIAIpA5AENwOQAiACIAIpA5gENwOYAiACIAEpAgA3A4ACIAIgASkCCDcDiAIgAyACQZACaiACQYACahAFIAEgAikCiAQ3AgggASACKQKABDcCACABIBIgASgCDHM2AgwgASARIAEoAghzNgIIIAEgECABKAIEczYCBCABIBMgASgCAHM2AgAgACAPIAAoAgBzNgIAIAEgDiABKAJEczYCRCABIA0gASgCSHM2AkggASAMIAEoAkxzNgJMIAIgASkCeDcDmAQgAiABKQJwNwOQBCACIAEpAmA3A/ABIAIgASkCaDcD+AEgAiABKQJwNwPgASACIAEpAng3A+gBIAMgAkHwAWogAkHgAWoQBSABIAIpAogENwJ4IAEgAikCgAQ3AnAgAiABKQJQNwPQASACIAEpAlg3A9gBIAIgASkCYDcDwAEgAiABKQJoNwPIASADIAJB0AFqIAJBwAFqEAUgASACKQKIBDcCaCABIAIpAoAENwJgIAIgACkCADcDsAEgAiABKQJINwO4ASACIAEpAlA3A6ABIAIgASkCWDcDqAEgAyACQbABaiACQaABahAFIAEgAikCiAQ3AlggASACKQKABDcCUCACIAEpAjA3A5ABIAIgASkCODcDmAEgAiAAKQIANwOAASACIAEpAkg3A4gBIAMgAkGQAWogAkGAAWoQBSABIAIpAogENwJIIAAgAikCgAQ3AgAgAiABKQIgNwNwIAIgASkCKDcDeCACIAEpAjA3A2AgAiABKQI4NwNoIAMgAkHwAGogAkHgAGoQBSABIAIpAogENwI4IAEgAikCgAQ3AjAgAiABKQIQNwNQIAIgASkCGDcDWCACIAEpAiA3A0AgAiABKQIoNwNIIAMgAkHQAGogAkFAaxAFIAEgAikCiAQ3AiggASACKQKABDcCICACIAEpAgA3AzAgAiABKQIINwM4IAIgASkCEDcDICACIAEpAhg3AyggAyACQTBqIAJBIGoQBSABIAIpAogENwIYIAEgAikCgAQ3AhAgAiACKQOQBDcDECACIAIpA5gENwMYIAIgASkCADcDACACIAEpAgg3AwggAyACQRBqIAIQBSABIAIpAogENwIIIAEgAikCgAQ3AgAgASALIAEoAgxzNgIMIAEgCiABKAIIczYCCCABIAkgASgCBHM2AgQgASAIIAEoAgBzNgIAIAAgByAAKAIAczYCACABIAYgASgCRHM2AkQgASAFIAEoAkhzNgJIIAEgBCABKAJMczYCTCACQaAEaiQAC5wJAQt/IwBBoAJrIgMkACABKAAEIQogASgACCELIAEoAAwhDCAAKAAEIQYgACgACCEHIAAoAAwhCCABKAAAIQ0gAiAAKAAAIgFBgIKEEHMiADYCcCACIAFB2/vgqAVzNgJgIAIgADYCUCACQUBrIgAgASANcyIFNgIAIAJCoKLEkbSurZRdNwI4IAJC2/vgqNXN8JdxNwIwIAJClcTcyYWy+rziADcCKCACQoCChJCwoIGEDTcCICACQqCixJG0rq2UXTcCGCACQtv74KjVzfCXcTcCECACIAU2AgAgAiAIQZDT55MGcyIFNgJ8IAIgB0GVxNzJBXMiBDYCeCACIAZBg4qg6ABzIgk2AnQgAiAIQfPqoul9czYCbCACIAdBoKLEkQRzNgJoIAIgBkHthL+Jf3M2AmQgAiAFNgJcIAIgBDYCWCACIAk2AlQgAiAIIAxzIgU2AkwgAiAHIAtzIgQ2AkggAiAGIApzIgk2AkQgAiAFNgIMIAIgBDYCCCACIAk2AgRBACEFA0AgAyACKQJ4NwOYAiADIAIpAnA3A5ACIAMgAikCYDcD8AEgAyACKQJoNwP4ASADIAIpAnA3A+ABIAMgAikCeDcD6AEgA0GAAmoiBCADQfABaiADQeABahAFIAIgAykCiAI3AnggAiADKQKAAjcCcCADIAIpAlA3A9ABIAMgAikCWDcD2AEgAyACKQJgNwPAASADIAIpAmg3A8gBIAQgA0HQAWogA0HAAWoQBSACIAMpAogCNwJoIAIgAykCgAI3AmAgAyAAKQIANwOwASADIAApAgg3A7gBIAMgAikCUDcDoAEgAyACKQJYNwOoASAEIANBsAFqIANBoAFqEAUgAiADKQKIAjcCWCACIAMpAoACNwJQIAMgAikCMDcDkAEgAyACKQI4NwOYASADIAApAgA3A4ABIAMgACkCCDcDiAEgBCADQZABaiADQYABahAFIAAgAykCiAI3AgggACADKQKAAjcCACADIAIpAiA3A3AgAyACKQIoNwN4IAMgAikCMDcDYCADIAIpAjg3A2ggBCADQfAAaiADQeAAahAFIAIgAykCiAI3AjggAiADKQKAAjcCMCADIAIpAhA3A1AgAyACKQIYNwNYIAMgAikCIDcDQCADIAIpAig3A0ggBCADQdAAaiADQUBrEAUgAiADKQKIAjcCKCACIAMpAoACNwIgIAMgAikCADcDMCADIAIpAgg3AzggAyACKQIQNwMgIAMgAikCGDcDKCAEIANBMGogA0EgahAFIAIgAykCiAI3AhggAiADKQKAAjcCECADIAMpA5ACNwMQIAMgAykDmAI3AxggAyACKQIANwMAIAMgAikCCDcDCCAEIANBEGogAxAFIAIgAykCiAI3AgggAiADKQKAAjcCACACIAIoAgwgDHM2AgwgAiACKAIIIAtzNgIIIAIgAigCBCAKczYCBCACIAIoAgAgDXM2AgAgACAAKAIAIAFzNgIAIAIgAigCRCAGczYCRCACIAIoAkggB3M2AkggAiACKAJMIAhzNgJMIAVBAWoiBUEKRw0ACyADQaACaiQAC7UFAQl/IwBBgAFrIgMkAEHixAItAAAhBCAAQgA3AgQgAEEBNgIAIABCADcCDCAAQgA3AhQgAEIANwIcIABCgICAgBA3AiQgAEEsakEAQcwA/AsAIAAgAUHAB2xBkBVqIgFB4sQCLQAAQQJ2IAIgAkEAIARBAnYgAkGAAXFBB3ZzIgRrcUEBdGsiAkEBc0H/AXFBAWtBH3ZzEB0gACABQfgAakHixAItAABBAnYgAkECc0H/AXFBAWtBH3ZzEB0gACABQfABakHixAItAABBAnYgAkEDc0H/AXFBAWtBH3ZzEB0gACABQegCakHixAItAABBAnYgAkEEc0H/AXFBAWtBH3ZzEB0gACABQeADakHixAItAABBAnYgAkEFc0H/AXFBAWtBH3ZzEB0gACABQdgEakHixAItAABBAnYgAkEGc0H/AXFBAWtBH3ZzEB0gACABQdAFakHixAItAABBAnYgAkEHc0H/AXFBAWtBH3ZzEB0gACABQcgGakHixAItAABBAnYgAkEIc0H/AXFBAWtBH3ZzEB0gAyAAKQJINwMoIAMgAEFAaykCADcDICADIAApAjg3AxggAyAAKQIwNwMQIAMgACkCKDcDCCADIAApAgA3AzAgAyAAKQIINwM4IAMgACkCEDcDQCADIAApAhg3A0ggAyAAKQIgNwNQIAAoAlAhASAAKAJUIQIgACgCWCEFIAAoAlwhBiAAKAJgIQcgACgCZCEIIAAoAmghCSAAKAJsIQogACgCcCELIANBACAAKAJ0azYCfCADQQAgC2s2AnggA0EAIAprNgJ0IANBACAJazYCcCADQQAgCGs2AmwgA0EAIAdrNgJoIANBACAGazYCZCADQQAgBWs2AmAgA0EAIAJrNgJcIANBACABazYCWCAAIANBCGogBBAdIANBgAFqJAAL8AkBHn8gASgCKCEDIAEoAgQhBCABKAIsIQUgASgCCCEGIAEoAjAhByABKAIMIQggASgCNCEJIAEoAhAhCiABKAI4IQsgASgCFCEMIAEoAjwhDSABKAIYIQ4gAUFAayIPKAIAIRAgASgCHCERIAEoAkQhEiABKAIgIRMgASgCSCEUIAEoAgAhFSAAIAEoAiQgASgCTGo2AiQgACATIBRqNgIgIAAgESASajYCHCAAIA4gEGo2AhggACAMIA1qNgIUIAAgCiALajYCECAAIAggCWo2AgwgACAGIAdqNgIIIAAgBCAFajYCBCAAIAMgFWo2AgAgASgCKCEFIAEoAgQhAyABKAIsIQYgASgCCCEHIAEoAjAhCCABKAIMIQkgASgCNCEKIAEoAhAhCyABKAI4IQwgASgCFCENIAEoAjwhDiABKAIYIRAgDygCACEPIAEoAhwhBCABKAJEIREgASgCICESIAEoAkghEyABKAIAIRQgACABKAJMIAEoAiRrNgJMIAAgEyASazYCSCAAIBEgBGs2AkQgAEFAayIEIA8gEGs2AgAgACAOIA1rNgI8IAAgDCALazYCOCAAIAogCWs2AjQgACAIIAdrNgIwIAAgBiADazYCLCAAQShqIgMgBSAUazYCACAAQdAAaiAAIAJBKGoQBiADIAMgAhAGIABB+ABqIAJB+ABqIAFB+ABqEAYgACABQdAAaiACQdAAahAGIAAoAgQhFSAAKAIIIRYgACgCDCEXIAAoAhAhGCAAKAIUIRkgACgCGCEaIAAoAhwhGyAAKAIgIRwgACgCJCEdIAMoAgAhASAAKAJQIQIgACgCLCEFIAAoAlQhBiAAKAIwIQcgACgCWCEIIAAoAjQhCSAAKAJcIQogACgCOCELIAAoAmAhDCAAKAI8IQ0gACgCZCEOIAQoAgAhDyAAKAJoIRAgACgCRCERIAAoAmwhEiAAKAJIIRMgACgCcCEUIAAoAgAhHiAAIAAoAkwiHyAAKAJ0IiBqNgJMIAAgEyAUajYCSCAAIBEgEmo2AkQgBCAPIBBqNgIAIAAgDSAOajYCPCAAIAsgDGo2AjggACAJIApqNgI0IAAgByAIajYCMCAAIAUgBmo2AiwgAyABIAJqNgIAIAAgICAfazYCJCAAIBQgE2s2AiAgACASIBFrNgIcIAAgECAPazYCGCAAIA4gDWs2AhQgACAMIAtrNgIQIAAgCiAJazYCDCAAIAggB2s2AgggACAGIAVrNgIEIAAgAiABazYCACAAIAAoApwBIgEgHUEBdCICajYCnAEgACAAKAKYASIDIBxBAXQiBGo2ApgBIAAgACgClAEiBSAbQQF0IgZqNgKUASAAIAAoApABIgcgGkEBdCIIajYCkAEgACAAKAKMASIJIBlBAXQiCmo2AowBIAAgACgCiAEiCyAYQQF0IgxqNgKIASAAIAAoAoQBIg0gF0EBdCIOajYChAEgACAAKAKAASIPIBZBAXQiEGo2AoABIAAgACgCfCIRIBVBAXQiEmo2AnwgACAAKAJ4IhMgHkEBdCIUajYCeCAAIAQgA2s2AnAgACAGIAVrNgJsIAAgCCAHazYCaCAAIAogCWs2AmQgACAMIAtrNgJgIAAgDiANazYCXCAAIBAgD2s2AlggACASIBFrNgJUIAAgFCATazYCUCAAIAIgAWs2AnQLEgAgACABIAKtIAOtQiCGhBAYC64OARd/IwBBwAJrIgMkACAAQShqIgkgARCAASAAQgA3AlQgAEEBNgJQIABCADcCXCAAQgA3AmQgAEIANwJsIABBADYCdCADQfABaiIIIAkQBCADQcABaiIGIAhBwAoQBkF/IQogAyADKALwAUEBayILNgLwASADIAMoAsABQQFqNgLAASADKAL0ASEMIAMoAvgBIQ0gAygC/AEhDiADKAKAAiEPIAMoAoQCIRAgAygCiAIhESADKAKMAiESIAMoApACIRMgAygClAIhFCADQZABaiIHIAYQBCAHIAcgBhAGIAAgBxAEIAAgACAGEAYgACAAIAgQBiMAQZABayIEJAAgBEHgAGoiBSAAEAQgBEEwaiICIAUQBCACIAIQBCACIAAgAhAGIAUgBSACEAYgBSAFEAQgBSACIAUQBiACIAUQBCACIAIQBCACIAIQBCACIAIQBCACIAIQBCAFIAIgBRAGIAIgBRAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAiAFEAYgBCACEAQgBCAEEAQgBCAEEAQgBCAEEAQgBCAEEAQgBCAEEAQgBCAEEAQgBCAEEAQgBCAEEAQgBCAEEAQgBCAEEAQgBCAEEAQgBCAEEAQgBCAEEAQgBCAEEAQgBCAEEAQgBCAEEAQgBCAEEAQgBCAEEAQgBCAEEAQgAiAEIAIQBiACIAIQBCACIAIQBCACIAIQBCACIAIQBCACIAIQBCACIAIQBCACIAIQBCACIAIQBCACIAIQBCACIAIQBCAFIAIgBRAGIAIgBRAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAhAEIAIgAiAFEAYgBCACEARBASECA0AgBCAEEAQgAkEBaiICQeQARw0ACyAEQTBqIgIgBCACEAYgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgAiACEAQgBEHgAGoiBSACIAUQBiAFIAUQBCAFIAUQBCAAIAUgABAGIARBkAFqJAAgACAAIAcQBiAAIAAgCBAGIANB4ABqIgIgABAEIAIgAiAGEAYgAyADKAKEASICIBRrNgJUIAMgAygCgAEiBCATazYCUCADIAMoAnwiBSASazYCTCADIAMoAngiBiARazYCSCADIAMoAnQiByAQazYCRCADIAMoAnAiCCAPazYCQCADIAMoAmwiFSAOazYCPCADIAMoAmgiFiANazYCOCADIAMoAmQiFyAMazYCNCADIAMoAmAiGCALazYCMCADIANBMGoQGgJAIANBIBAoRQRAIAMgAiAUajYCJCADIAQgE2o2AiAgAyAFIBJqNgIcIAMgBiARajYCGCADIAcgEGo2AhQgAyAIIA9qNgIQIAMgDiAVajYCDCADIA0gFmo2AgggAyAMIBdqNgIEIAMgCyAYajYCACADQaACaiICIAMQGiACQSAQKEUNASAAIABB8AoQBgsgA0GgAmogABAaIAMtAKACQQFxIAEtAB9BB3ZGBEAgAEEAIAAoAgBrNgIAIABBACAAKAIkazYCJCAAQQAgACgCIGs2AiAgAEEAIAAoAhxrNgIcIABBACAAKAIYazYCGCAAQQAgACgCFGs2AhQgAEEAIAAoAhBrNgIQIABBACAAKAIMazYCDCAAQQAgACgCCGs2AgggAEEAIAAoAgRrNgIECyAAQfgAaiAAIAkQBkEAIQoLIANBwAJqJAAgCgstAQF+IAKtIAOtQiCGhCIGQhBaBH8gACABQRBqIAEgBkIQfSAEIAUQRQVBfwsLGAAgACABIAIgA60gBK1CIIaEIAUgBhBFCxgAIAAgASACIAOtIAStQiCGhCAFIAYQMwtKAQJ/IwBBIGsiBiQAQX8hBwJAIAJCEFQNACAGIAQgBRAxDQAgACABQRBqIAEgAkIQfSADIAYQRSEHIAZBIBAHCyAGQSBqJAAgBwtPAQJ/IwBBIGsiBiQAIAJC8P///w9UBEBBfyEHIAYgBCAFEDFFBEAgAEEQaiAAIAEgAiADIAYQMyEHIAZBIBAHCyAGQSBqJAAgBw8LEAoAC6cIAQV/AkAgACABTw0AIABFDQAgAUUNACACRQ0AAkACQCAALQAAQTBrQf8BcSIDQQlLIgYEQEEAIQMgACEEDAELIABBAWohBAJAIAEgAGsiBUEBRg0AIAQtAABBMGtB/wFxIgdBCUsNASADQQpsIAdqIgNB/wFLDQMgAEECaiEEIAVBAkYNACAELQAAQTBrQf8BcSIHQQlLDQEgA0EKbCAHaiIDQf8BSw0DIABBA2ohBCAFQQNGDQAgBC0AAEEwa0H/AXFBCk8NAQwDCyABIQAMAQsgBCEAIAYNAQsgAiADOgAAIAEgBE0NACAALQAAQS5HDQAgASAAQQFqIgRrIgNBACABIANPGyEGAkAgASAETQRAQQAhBSAGIQMMAQtBACEFQQAhAyAELQAAQTBrQf8BcSIHQQpPDQAgAEECaiEEQQEhAyAGQQFGBEAgByEFIAYhAwwBCyAELQAAQTBrQf8BcSIFQQlLBEAgByEFDAELIAdBCmwgBWoiBUH/AUsNASAAQQNqIQRBAiEDIAZBAkYEQCAGIQMMAQsgBC0AAEEwa0H/AXEiB0EJSw0AIAVBCmwgB2oiBUH/AUsNASAAQQRqIQRBAyEDIAZBA0YEQCAGIQMMAQsgBC0AAEEwa0H/AXFBCkkNAQsgA0UEQEEADwsgAiAFOgABIAEgBE0EQEEADwsgBC0AAEEuRw0AIAEgBEEBaiIAayIDQQAgASADTxshBgJAIAAgAU8EQEEAIQUgBiEDDAELQQAhBUEAIQMgAC0AAEEwa0H/AXEiB0EKTw0AIARBAmohAEEBIQMgBkEBRgRAIAchBSAGIQMMAQsgAC0AAEEwa0H/AXEiBUEJSwRAIAchBQwBCyAHQQpsIAVqIgVB/wFLDQEgBEEDaiEAQQIhAyAGQQJGBEAgBiEDDAELIAAtAABBMGtB/wFxIgdBCUsNACAFQQpsIAdqIgVB/wFLDQEgBEEEaiEAQQMhAyAGQQNGBEAgBiEDDAELIAAtAABBMGtB/wFxQQpJDQELIANFBEBBAA8LIAIgBToAAiAAIAFPBEBBAA8LIAAtAABBLkcNAEEAIQYgASAAQQFqIgRrIgNBACABIANPGyEFAkAgASAETQRAIAUhAwwBC0EAIQMgBC0AAEEwa0H/AXEiB0EKTw0AIABBAmohBEEBIQMgBUEBRgRAIAchBiAFIQMMAQsgBC0AAEEwa0H/AXEiBkEJSwRAIAchBgwBCyAHQQpsIAZqIgZB/wFLDQEgAEEDaiEEQQIhAyAFQQJGBEAgBSEDDAELIAQtAABBMGtB/wFxIgdBCUsNACAGQQpsIAdqIgZB/wFLDQEgAEEEaiEEQQMhAyAFQQNGBEAgBSEDDAELIAQtAABBMGtB/wFxQQpJDQELIANFDQAgAiAGOgADIAEgBEYPC0EAC/QEARl+IAExAB8hAiABMQAeIQYgATEAHSEOIAExAAYhByABMQAFIQggATEABCEDIAExAAkhDyABMQAIIRAgATEAByERIAExAAwhCSABMQALIQogATEACiELIAExAA8hDCABMQAOIRIgATEADSETIAExABwhBCABMQAbIRQgATEAGiEVIAExABkhBSABMQAYIRYgATEAFyEXIAE1AAAhGCAAIAExABVCD4YgATEAFEIHhoQgATEAFkIXhoQgATUAECIZQoCAgAh8IhpCGYh8Ig0gDUKAgIAQfCINQoCAgOAPg30+AhggACAWQg2GIBdCBYaEIAVCFYaEIgUgDUIaiHwgBUKAgIAIfCIFQoCAgPADg30+AhwgACAUQgyGIBVCBIaEIARCFIaEIAVCGYh8IgQgBEKAgIAQfCIEQoCAgOAPg30+AiAgACAZIBpCgICA8A+DfSASQgqGIBNCAoaEIAxCEoaEIApCC4YgC0IDhoQgCUIThoQiCUKAgIAIfCIKQhmIfCILQoCAgBB8IgxCGoh8PgIUIAAgCyAMQoCAgOAPg30+AhAgACAQQg2GIBFCBYaEIA9CFYaEIAhCDoYgA0IGhoQgB0IWhoQiB0KAgIAIfCIIQhmIfCIDIANCgICAEHwiA0KAgIDgD4N9PgIIIAAgAkIShkKAgPAPgyAGQgqGIA5CAoaEhCICIARCGoh8IAJCgICACHwiAkKAgIAQg30+AiQgACADQhqIIAl8IApCgICA8ACDfT4CDCAAIAcgCEKAgIDwB4N9IBggAkIZiEITfnwiAkKAgIAQfCIGQhqIfD4CBCAAIAIgBkKAgIDgD4N9PgIAC4ECAQV/IwBBEGsiBSQAIAAtAOQBRQRAIAUCfwJAAkACQCAAKALgASIDQacBaw4CAAECCyAALQDlAUGAf3MMAgsgABAXQQAhAyAAQQA2AuABCyAAIABB5QFqIANBARANQYABCzoADyAAIAVBD2pBpwFBARANIAAQFyAAQQE6AOQBIABBADYC4AELIAIEQCAAKALgASEDA0AgA0GoAUYEQCAAEBcgAEEANgLgAUEAIQMLQagBIANrIgQgAiAGayIHIAQgB0kbIgQEQCABIAZqIAAgA2ogBPwKAAALIAAgACgC4AEgBGoiAzYC4AEgBCAGaiIGIAJJDQALCyAFQRBqJABBAAunAgEDfyMAQeACayIIJAAgCEEgaiIKQsAAIAYgBxAmIAhB4ABqIgkgCkG8uQIoAgARAQAaIApBwAAQByAJIAQgBUHAuQIoAgARAAAaIAlBkLkCQgAgBX1CD4NBwLkCKAIAEQAAGiAJIAEgAkHAuQIoAgARAAAaIAlBkLkCQgAgAn1CD4NBwLkCKAIAEQAAGiAIIAU3AxggCSAIQRhqIgRCCEHAuQIoAgARAAAaIAggAjcDGCAJIARCCEHAuQIoAgARAAAaIAkgCEHEuQIoAgARAQAaIAlBgAIQByAIIAMQKyEEIAhBEBAHAkAgAEUNACAEBEAgAqciAQRAIABBACAB/AsAC0F/IQQMAQsgACABIAIgBkEBIAcQJ0EAIQQLIAhB4AJqJAAgBAv8AQEDfyMAQeACayIIJAAgCEEgaiIKQsAAIAYgB0HouQIoAgAREQAaIAhB4ABqIgkgCkG8uQIoAgARAQAaIApBwAAQByAJIAQgBUHAuQIoAgARAAAaIAggBTcDGCAJIAhBGGoiBEIIQcC5AigCABEAABogCSABIAJBwLkCKAIAEQAAGiAIIAI3AxggCSAEQghBwLkCKAIAEQAAGiAJIAhBxLkCKAIAEQEAGiAJQYACEAcgCCADECshBCAIQRAQBwJAIABFDQAgBARAIAKnIgEEQCAAQQAgAfwLAAtBfyEEDAELIAAgASACIAYgBxBpQQAhBAsgCEHgAmokACAEC/0BAQN/IwBB0AJrIgokACAKQRBqIgtCwAAgByAIECYgCkHQAGoiCSALQby5AigCABEBABogC0HAABAHIAkgBSAGQcC5AigCABEAABogCUGQuQJCACAGfUIPg0HAuQIoAgARAAAaIAAgAyAEIAdBASAIECcgCSAAIARBwLkCKAIAEQAAGiAJQZC5AkIAIAR9Qg+DQcC5AigCABEAABogCiAGNwMIIAkgCkEIaiIAQghBwLkCKAIAEQAAGiAKIAQ3AwggCSAAQghBwLkCKAIAEQAAGiAJIAFBxLkCKAIAEQEAGiAJQYACEAcgAgRAIAJCEDcDAAsgCkHQAmokAEEAC9IBAQN/IwBB0AJrIgkkACAJQRBqIgtCwAAgByAIQei5AigCABERABogCUHQAGoiCiALQby5AigCABEBABogC0HAABAHIAogBSAGQcC5AigCABEAABogCSAGNwMIIAogCUEIaiIFQghBwLkCKAIAEQAAGiAAIAMgBCAHIAgQaSAKIAAgBEHAuQIoAgARAAAaIAkgBDcDCCAKIAVCCEHAuQIoAgARAAAaIAogAUHEuQIoAgARAQAaIApBgAIQByACBEAgAkIQNwMACyAJQdACaiQAQQALgQIBBX8jAEEQayIFJAAgAC0A5AFFBEAgBQJ/AkACQAJAIAAoAuABIgNBhwFrDgIAAQILIAAtAOUBQYB/cwwCCyAAEBdBACEDIABBADYC4AELIAAgAEHlAWogA0EBEA1BgAELOgAPIAAgBUEPakGHAUEBEA0gABAXIABBAToA5AEgAEEANgLgAQsgAgRAIAAoAuABIQMDQCADQYgBRgRAIAAQFyAAQQA2AuABQQAhAwtBiAEgA2siBCACIAZrIgcgBCAHSRsiBARAIAEgBmogACADaiAE/AoAAAsgACAAKALgASAEaiIDNgLgASAEIAZqIgYgAkkNAAsLIAVBEGokAEEAC9wCAQJ/IwBBkANrIggkACAIQQA2AgQgCEEQaiIJIAYgBxBUIAggBikAEDcCCCAIQdAAaiIHQsAAIAhBBGogCRAmIAhBkAFqIgYgB0G8uQIoAgARAQAaIAdBwAAQByAGIAQgBUHAuQIoAgARAAAaIAZB0LgCQgAgBX1CD4NBwLkCKAIAEQAAGiAGIAEgAkHAuQIoAgARAAAaIAZB0LgCQgAgAn1CD4NBwLkCKAIAEQAAGiAIIAU3A0ggBiAIQcgAaiIEQghBwLkCKAIAEQAAGiAIIAI3A0ggBiAEQghBwLkCKAIAEQAAGiAGIAhBMGoiBEHEuQIoAgARAQAaIAZBgAIQByAEIAMQKyEGIARBEBAHAkAgAEUNACAGBEAgAqciAQRAIABBACAB/AsAC0F/IQYMAQsgACABIAIgCEEEaiAIQRBqEGhBACEGCyAIQRBqQSAQByAIQZADaiQAIAYLpwIBA38jAEGAA2siCSQAIAlBADYCBCAJQRBqIgogByAIEFQgCSAHKQAQNwIIIAlBQGsiCELAACAJQQRqIgsgChAmIAlBgAFqIgcgCEG8uQIoAgARAQAaIAhBwAAQByAHIAUgBkHAuQIoAgARAAAaIAdB0LgCQgAgBn1CD4NBwLkCKAIAEQAAGiAAIAMgBCALIAoQaCAHIAAgBEHAuQIoAgARAAAaIAdB0LgCQgAgBH1CD4NBwLkCKAIAEQAAGiAJIAY3AzggByAJQThqIgBCCEHAuQIoAgARAAAaIAkgBDcDOCAHIABCCEHAuQIoAgARAAAaIAcgAUHEuQIoAgARAQAaIAdBgAIQByACBEAgAkIQNwMACyAJQRBqQSAQByAJQYADaiQAQQALmQcBB38jAEHQAmsiAyQAIAEoAAQhBCABKAAIIQUgASgADCEGIAIoAgQhByACKAIIIQggAigCDCEJIAAgAigCACABKAAAczYCACAAIAYgCXM2AgwgACAFIAhzNgIIIAAgBCAHczYCBCADIAApAgA3A7ACIAMgACkCCDcDuAIgAyACKQIQNwOgAiADIAIpAhg3A6gCIANBwAJqIgEgA0GwAmogA0GgAmoQBSAAIAMpAsgCNwIIIAAgAykCwAI3AgAgAyAAKQIANwOQAiADIAApAgg3A5gCIAMgAikCIDcDgAIgAyACKQIoNwOIAiABIANBkAJqIANBgAJqEAUgACADKQLIAjcCCCAAIAMpAsACNwIAIAMgACkCADcD8AEgAyAAKQIINwP4ASADIAIpAjA3A+ABIAMgAikCODcD6AEgASADQfABaiADQeABahAFIAAgAykCyAI3AgggACADKQLAAjcCACADIAApAgA3A9ABIAMgACkCCDcD2AEgAyACQUBrKQIANwPAASADIAIpAkg3A8gBIAEgA0HQAWogA0HAAWoQBSAAIAMpAsgCNwIIIAAgAykCwAI3AgAgAyAAKQIANwOwASADIAApAgg3A7gBIAMgAikCUDcDoAEgAyACKQJYNwOoASABIANBsAFqIANBoAFqEAUgACADKQLIAjcCCCAAIAMpAsACNwIAIAMgACkCADcDkAEgAyAAKQIINwOYASADIAIpAmA3A4ABIAMgAikCaDcDiAEgASADQZABaiADQYABahAFIAAgAykCyAI3AgggACADKQLAAjcCACADIAApAgA3A3AgAyAAKQIINwN4IAMgAikCcDcDYCADIAIpAng3A2ggASADQfAAaiADQeAAahAFIAAgAykCyAI3AgggACADKQLAAjcCACADIAApAgA3A1AgAyAAKQIINwNYIAMgAikCgAE3A0AgAyACKQKIATcDSCABIANB0ABqIANBQGsQBSAAIAMpAsgCNwIIIAAgAykCwAI3AgAgAyAAKQIANwMwIAMgACkCCDcDOCADIAIpApABNwMgIAMgAikCmAE3AyggASADQTBqIANBIGoQBSAAIAMpAsgCNwIIIAAgAykCwAI3AgAgAyAAKQIANwMQIAMgACkCCDcDGCADIAIpAqABNwMAIAMgAikCqAE3AwggASADQRBqIAMQISAAIAMpAsgCNwIIIAAgAykCwAI3AgAgA0HQAmokAAuwAwEFfyMAQaAfayIDJAAgA0GgHWoiBEHgACACQiAQSRogAyADKQPYHTcDmB0gAyADKQPQHTcDkB0gAyADKQPIHTcDiB0gAyADKQPAHTcDgB0gAyADKQO4HTcD+BwgAyADKQOwHTcD8BwgAyADKQOoHTcD6BwgAyADKQOgHTcD4BwgAyADKQPgHTcDICADIAMpA+gdNwMoIAMgAykD8B03AzAgAyADKQP4HTcDOCADQcATaiADQeAAaiIGIANB4BxqIgUQNRogA0FAayADQSBqIgdBzLkCKAIAEQEAGiAEQeAAEAcgBUHAABAHQX8hAiAFIAEgBhCRAUUEQCADIAcgAUHACGoiBBApBH8gBQUgA0GgHWoiAUEAQcgB/AsAIAFBADoA7AEgAUEgNgLoASABQoCAgICAETcD4AEgASADQeAcaiICQiAQGBog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CiALKQI4NwOYASAKIBApAgA3A4ABIAogCykCSDcDiAEgASAKQZABaiAKQYABahAFIAsgCikC2AE3AkggECAKKQLQATcCACAKIAspAiA3A3AgCiALKQIoNwN4IAogCykCMDcDYCAKIAspAjg3A2ggASAKQfAAaiAKQeAAahAFIAsgCikC2AE3AjggCyAKKQLQATcCMCAKIAspAhA3A1AgCiALKQIYNwNYIAogCykCIDcDQCAKIAspAig3A0ggASAKQdAAaiAKQUBrEAUgCyAKKQLYATcCKCALIAopAtABNwIgIAogCykCADcDMCAKIAspAgg3AzggCiALKQIQNwMgIAogCykCGDcDKCABIApBMGogCkEgahAFIAsgCikC2AE3AhggCyAKKQLQATcCECAKIAopA+ABNwMQIAogCikD6AE3AxggCiALKQIANwMAIAogCykCCDcDCCABIApBEGogChAFIAooAtABIQcgCigC1AEhBSAKKALYASEBIAsgCCAKKALcAXM2AgwgCyABIAxzNgIIIAsgBSANczYCBCALIAcgD3M2AgAgCkHwAWokAAsgCUGAA2ogBCAGrSACrSAJQbADahBrQX8hBwJAAkACQAJ/AkACQCAEQRBrDhEAAwMDAwMDAwMDAwMDAwMDAQMLIAlBgANqIAMQKwwBCyAJQYADaiADEEwLIgdFDQELIABFDQEgAkUNASAAQQAgAvwLAAwBC0EAIQcLIAlBoARqJAAgBwvaAQEDfyMAQRBrIgUkAAJAAkAgA0UEQEF/IQEMAQsCfyADIANBAWsiBnFFBEAgBiACQX9zIgdxDAELIAJBf3MhByAGIAIgA3BrCyIGIAdPDQEgBCACIAZqIgJNBEBBfyEBDAELIAAEQCAAIAJBAWo2AgALIAEgAmohAEEAIQEgBUEAOgAPQQAhAgNAIAAgAmsiBCAELQAAIAUtAA9xIAIgBnNBAWtBGHYiBEGAAXFyOgAAIAUgBS0ADyAEcjoADyACQQFqIgIgA0cNAAsLIAVBEGokACABDwsQCgALogwCBX8CfiMAQZAEayIJJAAgCCAHIAlBkANqEG5BACEIIAZBH0sEQEEgIQcDQCAFIAhqIAlBkANqEG0gByIIQSBqIgcgBk0NAAsLIAYgCEEQciIHTwRAA0AgBSAIaiIIKAAAIQsgCCgABCEMIAgoAAghDSAI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AGogBBBAIAGnIgZBA3EhB0EAIQMgAUIEWgRAIAZBPHEhCEEAIQYDQCAAIANqIARBIGoiCSIFIANqLQAAOgAAIAAgA0EBciIKaiAFIApqLQAAOgAAIAAgA0ECciIFaiAFIAlqLQAAOgAAIAAgA0EDciIFaiAEQSBqIAVqLQAAOgAAIANBBGohAyAGQQRqIgYgCEcNAAsgB0UNAQsDQCAAIANqIARBIGogA2otAAA6AAAgA0EBaiEDIAJBAWoiAiAHRw0ACwsgBEEgakHAABAHIARBIBAHCyAEQfAAaiQAQQALhgYBFH8jAEGwAmsiAiQAIAAgAS0AADoAACAAIAEtAAE6AAEgACABLQACOgACIAAgAS0AAzoAAyAAIAEtAAQ6AAQgACABLQAFOgAFIAAgAS0ABjoABiAAIAEtAAc6AAcgACABLQAIOgAIIAAgAS0ACToACSAAIAEtAAo6AAogACABLQALOgALIAAgAS0ADDoADCAAIAEtAA06AA0gACABLQAOOgAOIAAgAS0ADzoADyAAIAEtABA6ABAgACABLQAROgARIAAgAS0AEjoAEiAAIAEtABM6ABMgACABLQAUOgAUIAAgAS0AFToAFSAAIAEtABY6ABYgACABLQAXOgAXIAAgAS0AGDoAGCAAIAEtABk6ABkgACABLQAaOgAaIAAgAS0AGzoAGyAAIAEtABw6ABwgACABLQAdOgAdIAAgAS0AHjoAHiABLQAfIQEgACAALQAAQfgBcToAACAAIAFBP3FBwAByOgAfIAJBMGogABBCIAIoAoABIQEgAigCWCEDIAIoAoQBIQQgAigCXCEFIAIoAogBIQYgAigCYCEHIAIoAowBIQggAigCZCEJIAIoApABIQogAigCaCELIAIoApQBIQwgAigCbCENIAIoApgBIQ4gAigCcCEPIAIoApwBIRAgAigCdCERIAIoAqABIRIgAigCeCETIAIgAigCfCIUIAIoAqQBIhVqNgKkAiACIBIgE2o2AqACIAIgECARajYCnAIgAiAOIA9qNgKYAiACIAwgDWo2ApQCIAIgCiALajYCkAIgAiAIIAlqNgKMAiACIAYgB2o2AogCIAIgBCAFajYChAIgAiABIANqNgKAAiACIBUgFGs2AvQBIAIgEiATazYC8AEgAiAQIBFrNgLsASACIA4gD2s2AugBIAIgDCAN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AsQBIAMgBCAMajYCwAEgAyAHIA9qNgLMASADQeAAaiIaIANBMGoiDCADQfABaiIFEAYgA0HAAWoiBCAEIAMQBiAMIAMQBCADIAUQBCADKALAASECIAMoAmAhBiADKALEASEKIAMoAmQhByADKALIASEIIAMoAmghCSADKALMASELIAMoAmwhDSADKALQASEXIAMoAnAhDiADKALUASEPIAMoAnQhECADKALYASEUIAMoAnghESADKALcASESIAMoAnwhEyADKALgASEVIAMoAoABIRggAyADKALkASIZIAMoAoQBIhtqNgK0ASADIBUgGGo2ArABIAMgEiATajYCrAEgAyARIBRqNgKoASADIA8gEGo2AqQBIAMgDiAXajYCoAEgAyALIA1qNgKcASADIAggCWo2ApgBIAMgByAKajYClAEgAyACIAZqNgKQASADIBsgGWs2AuQBIAMgGCAVazYC4AEgAyATIBJrNgLcASADIBEgFGs2AtgBIAMgECAPazYC1AEgAyAOIBdrNgLQASADIA0gC2s2AswBIAMgCSAIazYCyAEgAyAHIAprNgLEASADIAYgAms2AsABIAUgAyAMEAYgAygCSCECIAMoAhghDiADKAJEIQYgAygCFCEPIAMoAkAhCiADKAIQIRAgAygCPCEHIAMoAgwhFCADKAI4IQggAygCCCERIAMoAjQhCSADKAIEIRIgAygCVCELIAMoAiQhEyADKAIwIQ0gAygCACEVIAMoAkwhFyADKAIcIRggAyADKAIgIAMoAlAiGWsiGzYCICADIBggF2siGDYCHCADIBUgDWsiFTYCACADIBMgC2siEzYCJCADIBIgCWsiEjYCBCADIBEgCGsiETYCCCADIBQgB2siFDYCDCADIBAgCmsiEDYCECADIA8gBmsiDzYCFCADIA4gAmsiDjYCGCAEIAQQBCADQZABaiIcIBwQBCADIBkgG6xCwrYHfiAYrELCtgd+IkBCgICACHwiQkIZh3wiQSBBQoCAgBB8IkFCgICA4A+DfadqNgJQIAMgAiAOrELCtgd+IA+sQsK2B34iRkKAgIAIfCJHQhmHfCJDIENCgICAEHwiQ0KAgIDgD4N9p2o2AkggAyAKIBCsQsK2B34gFKxCwrYHfiJIQoCAgAh8IklCGYd8IkQgREKAgIAQfCJEQoCAgOAPg32najYCQCADIAggEaxCwrYHfiASrELCtgd+IkpCgICACHwiS0IZh3wiRSBFQoCAgBB8IkVCgICA4A+DfadqNgI4IAMgCyATrELCtgd+IkwgQUIaiHwgTEKAgIAIfCJBQoCAgPAPg32najYCVCADIBcgQ0IaiCBAfCBCQoCAgPAPg32najYCTCADIAYgREIaiCBGfCBHQoCAgPAPg32najYCRCADIAcgRUIaiCBIfCBJQoCAgPAPg32najYCPCADIAkgSiBLQoCAgPAPg30gQUIZh0ITfiAVrELCtgd+fCJAQoCAgBB8IkJCGoh8p2o2AjQgAyANIEAgQkKAgIDgD4N9p2o2AjAgAUEBayECIBogA0GgAmogBBAGIAQgAyAMEAYgAQ0ACyADKAKQASEXIAMoAvABIQIgAygClAEhDiADKAL0ASEMIAMoApgBIQ8gAygC+AEhBiADKAKcASEQIAMoAvwBIQogAygCoAEhFCADKAKAAiEHIAMoAqQBIREgAygChAIhCCADKAKoASESIAMoAogCIQkgAygCrAEhEyADKAKMAiELIAMoArABIRUgAygCkAIhDSADQQAgFmsiASADKAKUAiIWIAMoArQBc3EgFnM2ApQCIAMgDSANIBVzIAFxczYCkAIgAyALIAsgE3MgAXFzNgKMAiADIAkgCSAScyABcXM2AogCIAMgCCAIIBFzIAFxczYChAIgAyAHIAcgFHMgAXFzNgKAAiADIAogCiAQcyABcXM2AvwBIAMgBiAGIA9zIAFxczYC+AEgAyAMIAwgDnMgAXFzNgL0ASADIAIgAiAXcyABcXM2AvABIAMoAsABIQIgAygCYCENIAMoAsQBIRYgAygCZCEXIAMoAsgBIQwgAygCaCEOIAMoAswBIQYgAygCbCEPIAMoAtABIQogAygCcCEQIAMoAtQBIQcgAygCdCEUIAMoAtgBIQggAygCeCERIAMoAtwBIQkgAygCfCESIAMoAuABIQsgAygCgAEhEyADIAMoAuQBIhUgAygChAFzIAFxIBVzNgLkASADIAsgCyATcyABcXM2AuABIAMgCSAJIBJzIAFxczYC3AEgAyAIIAggEXMgAXFzNgLYASADIAcgByAUcyABcXM2AtQBIAMgCiAKIBBzIAFxczYC0AEgAyAGIAYgD3MgAXFzNgLMASADIAwgDCAOcyABcXM2AsgB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JyAFLQADczoAJyAAIAAtACggBS0ABHM6ACggACAALQApIAUtAAVzOgApIAAgAC0AKiAFLQAGczoAKiAAIAAtACsgBS0AB3M6ACsgCRBxAkAgB0ECcUUEQCAJQQQQKEUNAQsgBSAAKQAYNwP4AiAFIAApABA3A/ACIAUgACkACDcD6AIgBSAAKQAANwPgAiAFIAApACQ3A4ADIAVB4AJqIgEgAUIoIAlBACAAQfS5AigCABEOABogACAFKQP4AjcAGCAAIAUpA/ACNwAQIAAgBSkD6AI3AAggACAFKQPgAjcAACAFKQOAAyEKIABBATYAICAAIAo3ACQLIAIEQCACIAs3AwALQQAhDSADRQ0AIAMgBzoAAAsgBUGQA2okACANDAELEAoACwvhBQECfgJ/IAStIAWtQiCGhCEKIAetIAitQiCGhCELIwBBgANrIgQkACACBEAgAkIANwMACyAKQu////8PVARAIARBEGoiCELAACAAQSBqIgcgABAmIARB0ABqIgUgCEG8uQIoAgARAQAaIAhBwAAQByAFIAYgC0HAuQIoAgARAAAaIAVB0LMCQgAgC31CD4NBwLkCKAIAEQAAGiAEQgA3AxAgBEIANwNIIARCADcDQCAEQgA3AzggBEIANwMwIARCADcDKCAEQgA3AyAgBEIANwMYIAQgCToAECAIIAhCwAAgB0EBIAAQJyAFIAhCwABBwLkCKAIAEQAAGiABIAQtABA6AAAgAUEBaiIBIAMgCiAHQQIgABAnIAUgASAKQcC5AigCABEAABogBUHQswIgCkIPg0HAuQIoAgARAAAaIAQgCzcDCCAFIARBCGoiA0IIQcC5AigCABEAABogBCAKQkB9NwMIIAUgA0IIQcC5AigCABEAABogBSABIAqnaiIBQcS5AigCABEBABogBUGAAhAHIAAgAC0AJCABLQAAczoAJCAAIAAtACUgAS0AAXM6ACUgACAALQAmIAEtAAJzOgAmIAAgAC0AJyABLQADczoAJyAAIAAtACggAS0ABHM6ACggACAALQApIAEtAAVzOgApIAAgAC0AKiABLQAGczoAKiAAIAAtACsgAS0AB3M6ACsgBxBxAkAgCUECcUUEQCAHQQQQKEUNAQsgBCAAKQAYNwPoAiAEIAApABA3A+ACIAQgACkACDcD2AIgBCAAKQAANwPQAiAEIAAp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C6dqQRBrIAYgDCAJIAoQgwEhAgsgAQRAIAFCACALQhB9IAIbNwMACyACCyUAIAAgAiADrSAErUIghoQgBSAGIAetIAitQiCGhCAJIAoQgwELWQECfgJ/IAatIAetQiCGhCEMIAOtIAStQiCGhCILQvD///8PVARAIAAgACALp2pBACACIAsgBSAMIAkgChCEARogAQRAIAEgC0IQfDcDAAtBAAwBCxAKAAsLJwAgACABIAIgAyAErSAFrUIghoQgBiAHrSAIrUIghoQgCiALEIQBC1kBAn4CfyAGrSAHrUIghoQhDCADrSAErUIghoQiC0Lw////D1QEQCAAIAAgC6dqQQAgAiALIAUgDCAJIAoQhQEaIAEEQCABIAtCEHw3AwALQQAMAQsQCgALCycAIAAgASACIAMgBK0gBa1CIIaEIAYgB60gCK1CIIaEIAogCxCFAQtZAQJ+IAetIAitQiCGhCELQX8hAQJAIAOtIAStQiCGhCIMQt////8PVg0AIAtC3////w9WDQAgACACIAynIAVBICAGIAunIAkgCkHkuQIoAgARCgAhAQsgAQuAAQEDfiAHrSAIrUIghoQhDEF/IQICQCAErSAFrUIghoQiC0IgVA0AIAtCIH0iDULf////D1YNACAMQt////8PVg0AIAAgAyANpyADIAunakEga0EgIAYgDKcgCSAKQeS5AigCABEKACECCyABBEAgAUIAIAtCIH0gAhs3AwALIAILYAECfiAErSAFrUIghoQhDCAHrSAIrUIghoQhDSACBEAgAkIgNwMACyANQuD///8PVCAMQt////8PWHFFBEAQCgALIAAgAUEgIAMgDKcgBiANpyAKIAtB4LkCKAIAEQoAC3YBAn4CfyAGrSAHrUIghoQhCwJAIAOtIAStQiCGhCIMQuD///8PWg0AIAtC4P///w9aDQAgACAAIAynIgNqQSAgAiADIAUgC6cgCSAKQeC5AigCABEKACEAIAEEQCABQgAgDEIgfCAAGzcDAAsgAAwBCxAKAAsLWQECfiAHrSAIrUIghoQhC0F/IQECQCADrSAErUIghoQiDELf////D1YNACALQt////8PVg0AIAAgAiAMpyAFQSAgBiALpyAJIApB3LkCKAIAEQoAIQELIAELgAEBA34gB60gCK1CIIaEIQxBfyECAkAgBK0gBa1CIIaE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//8HSw0AIAEgA0EBdE0NAEEAIQEgAwR/A0AgACABQQF0aiIEIAEgAmotAAAiBUEPcSIGQQh0IAZB9v8DakGAsgNxakGArgFqQQh2OgABIAQgBUEEdiIEIARB9v8DakEIdkHZAXFqQdcAajoAACABQQFqIgEgA0cNAAsgA0EBdAVBAAsgAGpBADoAACAADwsQCgALCgAgACABIAIQMQsIACAAIAEQWwtaAQF/IwBBQGoiAyQAIAMgAkIgEC8aIAEgAykDGDcAGCABIAMpAxA3ABAgASADKQMINwAIIAEgAykDADcAACADQcAAEAcgACABQcy5AigCABEBACADQUBrJAALCwAgACABIAIQgQELCwAgACABIAIQigELCwAgACABIAIQiwELCQAgACABEI0BCwsAIAAgASACEI4BCwUAQcMICwQAQQwLJwEBfyMAQUBqIgMkACAAIAMQHCABIANCwAAgAkEBEF0gA0FAayQACykBAX8jAEFAaiIEJAAgACAEEBwgASACIARCwAAgA0EBEF4gBEFAayQACwgAIAAQJUEAC7sBAgJ/A34jAEHAAWsiAiQAIAJBIBAVIAEgAkIgEC8aIAEgAS0AAEH4AXE6AAAgASABLQAfQT9xQcAAcjoAHyACQSBqIgMgARBCIAAgAxBDIAEgAikDGDcAGCABIAIpAxA3ABAgASACKQMINwAIIAEgAikDADcAACAAKQAAIQQgACkACCEFIAApABAhBiABIAApABg3ADggASAGNwAwIAEgBTcAKCABIAQ3ACAgAkEgEAcgAkHAAWokAEEAC7YBAgF/A34jAEGgAWsiAyQAIAEgAkIgEC8aIAEgAS0AAEH4AXE6AAAgASABLQAfQT9xQcAAcjoAHyADIAEQQiAAIAMQQyACKQAAIQQgAikACCEFIAIpABAhBiABIAIpABg3ABggASAGNwAQIAEgBTcACCABIAQ3AAAgACkAACEEIAApAAghBSAAKQAQIQYgASAAKQAYNwA4IAEgBjcAMCABIAU3ACggASAENwAgIANBoAFqJABBAAsFAEG/fwsKACAAIAEQYEEAC20BAX8jAEFAaiICJAAgAiABQiAQLxogAiACLQAAQfgBcToAACACIAItAB9BP3FBwAByOgAfIAAgAikDEDcAECAAIAIpAwg3AAggACACKQMANwAAIAAgAikDGDcAGCACQcAAEAcgAkFAayQAQQALohYCFX8ofiMAQYACayIDJABBfyETAkAgARBYDQAgA0HgAGoiBCABEHkNACMAQYAQayICJAAgAkGABWoiASAEEBIgAiAEKQIgNwPgAiACIAQpAhg3A9gCIAIgBCkCEDcD0AIgAiAEKQIINwPIAiACIAQpAgA3A8ACIAIgBCkCKDcD6AIgAiAEKQIwNwPwAiACIAQpAjg3A/gCIAIgBEFAaykCADcDgAMgAiAEKQJINwOIAyACIAQpAlA3A5ADIAIgBCkCWDcDmAMgAiAEKQJgNwOgAyACIAQpAmg3A6gDIAIgBCkCcDcDsAMgAkHgA2oiBSACQcACaiIJECIgAkGgAWoiBCAFIAJB2ARqIgYQBiACQcgBaiACQYgEaiIHIAJBsARqIggQBiACQfABaiAIIAYQBiACQZgCaiAFIAcQBiAFIAQgARATIAkgBSAGEAYgAkHoAmoiCiAHIAgQBiACQZADaiILIAggBhAGIAJBuANqIgwgBSAHEAYgAkGgBmoiASAJEBIgBSAEIAEQEyAJIAUgBhAGIAogByAIEAYgCyAIIAYQBiAMIAUgBxAGIAJBwAdqIgEgCRASIAUgBCABEBMgCSAFIAYQBiAKIAcgCBAGIAsgCCAGEAYgDCAFIAcQBiACQeAIaiIBIAkQEiAFIAQgARATIAkgBSAGEAYgCiAHIAgQBiALIAggBhAGIAwgBSAHEAYgAkGACmoiASAJEBIgBSAEIAEQEyAJIAUgBhAGIAogByAIEAYgCyAIIAYQBiAMIAUgBxAGIAJBoAtqIgEgCRASIAUgBCABEBMgCSAFIAYQBiAKIAcgCBAGIAsgCCAGEAYgDCAFIAcQBiACQcAMaiIBIAkQEiAFIAQgARATIAkgBSAGEAYgCiAHIAgQBiALIAggBhAGIAwgBSAHEAYgAkHgDWogCRASIAJCADcDICACQgA3AxggAkIANwMQIAJCADcDCCACQgA3AwAgAkIANwIsIAJBATYCKCACQgA3AjQgAkIANwI8IAJCADcCRCACQoCAgIAQNwJMIAJB1ABqQQBBzAD8CwAgAkH4AGohCSACQdgPaiEPIAJBsA9qIRAgAkHQAGohDSACQShqIQ5B/AEhBANAIAIgAikDIDcDqA8gAiACKQMYNwOgDyACIAIpAxA3A5gPIAIgAikDCDcDkA8gAiACKQMANwOIDyAQIA4pAiA3AiAgECAOKQIYNwIYIBAgDikCEDcCECAQIA4pAgg3AgggECAOKQIANwIAIA8gDSkCIDcCICAPIA0pAhg3AhggDyANKQIQNwIQIA8gDSkCCDcCCCAPIA0pAgA3AgAgBCIBQZCFAmosAAAhESACQeADaiIFIAJBiA9qECICQCARQQBKBEAgAkHAAmoiBCAFIAYQBiAKIAcgCBAGIAsgCCAGEAYgDCAFIAcQBiAFIAQgAkGABWogEUH+AXFBAXZBoAFsahATDAELIBFBAE4NACACQcACaiIEIAJB4ANqIgUgBhAGIAogByAIEAYgCyAIIAYQBiAMIAUgBxAGIAUgBCACQYAFakEAIBFrQf4BcUEBdkGgAWxqEHcLIAIgAkHgA2oiEiAGEAYgDiAHIAgQBiANIAggBhAGIAkgEiAHEAYgAUEBayEEIAENAAsgAigCKCEUIAIoAlAhFSACKAIsIRYgAigCVCEGIAIoAjAhByACKAJYIQggAigCNCEKIAIoAlwhCyACKAI4IQwgAigCYCENIAIoAjwhDiACKAJkIQ8gAigCQCEQIAIoAmghESACKAJEIQUgAigCbCEJIAIoAkghBCACKAJwIQEgAiACKAJMIAIoAnRrNgKkBSACIAQgAWs2AqAFIAIgBSAJazYCnAUgAiAQIBFrNgKYBSACIA4gD2s2ApQFIAIgDCANazYCkAUgAiAKIAtrNgKMBSACIAcgCGs2AogFIAIgFiAGazYChAUgAiAUIBVrNgKABSASIAIQGiASQSAQKCEEIBIgAkGABWoQGiASQSAQKCACQYAQaiQAIARxRQ0AQQAhEyADQQAgAygCrAEiBms2AiQgA0EAIAMoAqgBIgxrNgIgIANBACADKAKkASIHazYCHCADQQAgAygCoAEiBWs2AhggA0EAIAMoApwBIghrNgIUIANBACADKAKYASIJazYCECADQQAgAygClAEiCms2AgwgA0EAIAMoApABIgRrNgIIIANBACADKAKMASILazYCBCADQQEgAygCiAEiAWs2AgAgAyADEEQgAyADKAIEIg2sIh8gCEEBdKwiKX4gAzQCACIZIAWsIhp+fCADKAIIIg6sIiEgCawiG358IAMoAgwiD6wiIyAKQQF0rCIqfnwgAygCECIQrCIlIASsIhx+fCADKAIUIhGsIisgC0EBdKwiLH58IAMoAhgiBawiNSABQQFqrCIdfnwgAygCHCIJQRNsrCIkIAZBAXSsIi1+fCADKAIgIgRBE2ysIiIgDKwiHn58IAMoAiQiAUETbKwiICAHQQF0rCIufnwgGyAffiAZIAisIi9+fCAhIAqsIjB+fCAcICN+fCAlIAusIjF+fCAdICt+fCAFQRNsrCImIAasIjJ+fCAeICR+fCAiIAesIjN+fCAaICB+fCAfICp+IBkgG358IBwgIX58ICMgLH58IB0gJX58IBFBE2ysIjQgLX58IB4gJn58ICQgLn58IBogIn58ICAgKX58IjdCgICAEHwiOEIah3wiOUKAgIAIfCI6QhmHfCIXIBdCgICAEHwiJ0KAgIDgD4N9PgJIIAMgHyAsfiAZIBx+fCAdICF+fCAPQRNsrCIYIC1+fCAQQRNsrCIoIB5+fCAuIDR+fCAaICZ+fCAkICl+fCAbICJ+fCAgICp+fCAdIB9+IBkgMX58IA5BE2ysIhcgMn58IBggHn58ICggM358IBogNH58ICYgL358IBsgJH58ICIgMH58IBwgIH58IA1BE2ysIC1+IBkgHX58IBcgHn58IBggLn58IBogKH58ICkgNH58IBsgJn58ICQgKn58IBwgIn58ICAgLH58IjtCgICAEHwiPEIah3wiPUKAgIAIfCI+QhmHfCIXIBdCgICAEHwiGEKAgIDgD4N9PgI4IAMgGiAffiAZIDN+fCAhIC9+fCAbICN+fCAlIDB+fCAcICt+fCAxIDV+fCAJrCI2IB1+fCAiIDJ+fCAeICB+fCAnQhqHfCIXIBdCgICACHwiJ0KAgIDwD4N9PgJMIAMgHCAffiAZIDB+fCAhIDF+fCAdICN+fCAoIDJ+fCAeIDR+fCAmIDN+fCAaICR+fCAiIC9+fCAbICB+fCAYQhqHfCIXIBdCgICACHwiGEKAgIDwD4N9PgI8IAMgHyAufiAZIB5+fCAaICF+fCAjICl+fCAbICV+fCAqICt+fCAcIDV+fCAsIDZ+fCAErCIoIB1+fCAgIC1+fCAnQhmHfCIXIBdCgICAEHwiJ0KAgIDgD4N9PgJQIAMgOSA6QoCAgPAPg30gNyA4QoCAgGCDfSAYQhmHfCIYQoCAgBB8IhdCGoh8PgJEIAMgGCAXQoCAgOAPg30+AkAgAyAeIB9+IBkgMn58ICEgM358IBogI358ICUgL358IBsgK358IDAgNX58IBwgNn58ICggMX58IAGsIB1+fCAnQhqHfCIXIBdCgICACHwiF0KAgIDwD4N9PgJUIAMgPSA+QoCAgPAPg30gOyA8QoCAgGCDfSAXQhmHQhN+fCIYQoCAgBB8IhdCGoh8PgI0IAMgGCAXQoCAgOAPg30+AjAgACADQTBqEBoLIANBgAJqJAAgEwsLACAAIAEgAhCGAQsEAEEECwQAQRoLBQBBrwoLDAAgACABIAIQYkEACxIAIAAgASACQZS6AigCABEEAAsSACAAIAEgAkGQugIoAgARBAALEgAgACABIAJBjLoCKAIAEQQACxQAIAAgASACIANBiLoCKAIAEQsACxIAIAAgASACQYS6AigCABEEAAsUACAAIAEgAiADQYC6AigCABELAAsSACAAIAEgAkH8uQIoAgARBAALtAEBAX8gACABKAAAQf///x9xNgIAIAAgASgAA0ECdkGD/v8fcTYCBCAAIAEoAAZBBHZB/4H/H3E2AgggACABKAAJQQZ2Qf//wB9xNgIMIAEoAAwhAiAAQgA3AhQgAEIANwIcIABBADYCJCAAIAJBCHZB//8/cTYCECAAIAEoABA2AiggACABKAAUNgIsIAAgASgAGDYCMCABKAAcIQEgAEEAOgBQIABCADcDOCAAIAE2AjRBAAvFKAELfyMAQRBrIgokAAJAAkACQAJAAkACQAJAAkACQAJAIABB9AFNBEBB1MACKAIAIgRBECAAQQtqQfgDcSAAQQtJGyIGQQN2IgB2IgFBA3EEQAJAIAFBf3NBAXEgAGoiA0EDdCIBQfzAAmoiACABKAKEwQIiAigCCCIFRgRAQdTAAiAEQX4gA3dxNgIADAELIAUgADYCDCAAIAU2AggLIAJBCGohACACIAFBA3I2AgQgASACaiIBIAEoAgRBAXI2AgQMCwsgBkHcwAIoAgAiCE0NASABBEACQEECIAB0IgJBACACa3IgASAAdHFoIgNBA3QiAUH8wAJqIgIgASgChMECIgAoAggiBUYEQEHUwAIgBEF+IAN3cSIENgIADAELIAUgAjYCDCACIAU2AggLIAAgBkEDcjYCBCAAIAZqIgcgASAGayIFQQFyNgIEIAAgAWogBTYCACAIBEAgCEF4cUH8wAJqIQFB6MACKAIAIQIC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QZAIaiEUIANBgAhqIRUgA0GgCGohFkEAIQdBACEIA0AgAyADKAKMByACczYCrAUgAyANQf8BcSATQRh0IhcgD0H/AXFBEHRyIA5B/wFxQQh0cnIiBCADKAKIB3M2AqgFIAMgCkH/AXEgEkEYdCIYIAxB/wFxQRB0ciALQf8BcUEIdHJyIgkgAygChAdzNgKkBSADIBFB/wFxIAZBGHQiGSAIQf8BcUEQdHIgB0H/AXFBCHRyciIQIAMoAoAHczYCoAUgAyADKALcBSACczYCnAUgAyADKALYBSAEczYCmAUgAyADKALUBSAJczYClAUgAyADKALQBSAQczYCkAUgAyADKQOoBTcD+AQgAyADKQOgBTcD8AQgAyADKQKYBzcD6AQgAyADKQKQBzcD4AQgA0GABWoiBCADQfAEaiADQeAEahAFIAMgAykCiAU3A6gFIAMgAykCgAU3A6AFIAMgAykDkAU3A9AEIAMgAykDmAU3A9gEIAMgAykC4AU3A8AEIAMgAykC6AU3A8gEIAQgA0HQBGogA0HABGoQBSADIAMpAogFNwOYBSADIAMpAoAFNwOQBSADIAMpA6AFNwOwBCADIAMpA6gFNwO4BCADIAMpAqAHNwOgBCADIAMpAqgHNwOoBCAEIANBsARqIANBoARqEAUgAyADKQKIBTcDqAUgAyADKQKABTcDoAUgAyADKQOQBTcDkAQgAyADKQOYBTcDmAQgAyADKQLwBTcDgAQgAyADKQL4BTcDiAQgBCADQZAEaiADQYAEahAFIAMgAykCiAU3A5gFIAMgAykCgAU3A5AFIAMgAykDoAU3A/ADIAMgAykDqAU3A/gDIAMgAykCsAc3A+ADIAMgAykCuAc3A+gDIAQgA0HwA2ogA0HgA2oQBSADIAMpAogFNwOoBSADIAMpAoAFNwOgBSADIAMpA5AFNwPQAyADIAMpA5gFNwPYAyADIAMpAoAGNwPAAyADIAMpAogGNwPIAyAEIANB0ANqIANBwANqEAUgAyADKQKIBTcDmAUgAyADKQKABTcDkAUgAyADKQOgBTcDsAMgAyADKQOoBTcDuAMgAyADKQLABzcDoAMgAyADKQLIBzcDqAMgBCADQbADaiADQaADahAFIAMgAykCiAU3A6gFIAMgAykCgAU3A6AFIAMgAykDkAU3A5ADIAMgAykDmAU3A5gDIAMgAykCkAY3A4ADIAMgAykCmAY3A4gDIAQgA0GQA2ogA0GAA2oQBSADIAMpAogFNwOYBSADIAMpAoAFNwOQBSADIAMpA6AFNwPwAiADIAMpA6gFNwP4AiADIAMpAtAHNwPgAiADIAMpAtgHNwPoAiAEIANB8AJqIANB4AJqEAUgAyADKQKIBTcDqAUgAyADKQKABTcDoAUgAyADKQOQBTcD0AIgAyADKQOYBTcD2AIgAyADKQKgBjcDwAIgAyADKQKoBjcDyAIgBCADQdACaiADQcACahAFIAMgAykCiAU3A5gFIAMgAykCgAU3A5AFIAMgAykDoAU3A7ACIAMgAykDqAU3A7gCIAMgAykC4Ac3A6ACIAMgAykC6Ac3A6gCIAQgA0GwAmogA0GgAmoQBSADIAMpAogFNwOoBSADIAMpAoAFNwOgBSADIAMpA5AFNwOQAiADIAMpA5gFNwOYAiADIAMpArAGNwOAAiADIAMpArgGNwOIAiAEIANBkAJqIANBgAJqEAUgAyADKQKIBTcDmAUgAyADKQKABTcDkAUgAyADKQOgBTcD8AEgAyADKQOoBTcD+AEgAyADKQLwBzcD4AEgAyADKQL4BzcD6AEgBCADQfABaiADQeABahAFIAMgAykCiAU3A6gFIAMgAykCgAU3A6AFIAMgAykDkAU3A9ABIAMgAykDmAU3A9gBIAMgAykCwAY3A8ABIAMgAykCyAY3A8gBIAQgA0HQAWogA0HAAWoQBSADIAMpAogFNwOYBSADIAMpAoAFNwOQBSADIAMpA6AFNwOwASADIAMpA6gFNwO4ASADIBUpAgA3A6ABIAMgFSkCCDcDqAEgBCADQbABaiADQaABahAFIAMgAykCiAU3A6gFIAMgAykCgAU3A6AFIAMgAykDkAU3A5ABIAMgAykDmAU3A5gBIAMgAykC0AY3A4ABIAMgAykC2AY3A4gBIAQgA0GQAWogA0GAAWoQBSADIAMpAogFNwOYBSADIAMpAoAFNwOQBSADIAMpA6AFNwNwIAMgAykDqAU3A3ggAyAUKQIANwNgIAMgFCkCCDcDaCAEIANB8ABqIANB4ABqEAUgAyADKQKIBTcDqAUgAyADKQKABTcDoAUgAyADKQOQBTcDUCADIAMpA5gFNwNYIAMgAykC4AY3A0AgAyADKQLoBjcDSCAEIANB0ABq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BzcD6AMgBCADQfADaiADQeADahAFIAMgAykCiAU3A6gFIAMgAykCgAU3A6AFIAMgAykDkAU3A9ADIAMgAykDmAU3A9gDIAMgAykCgAY3A8ADIAMgAykCiAY3A8gDIAQgA0HQA2ogA0HAA2oQBSADIAMpAogFNwOYBSADIAMpAoAFNwOQBSADIAMpA6AFNwOwAyADIAMpA6gFNwO4AyADIAMpAsAHNwOgAyADIAMpAsgHNwOoAyAEIANBsANqIANBoANqEAUgAyADKQKIBTcDqAUgAyADKQKABTcDoAUgAyADKQOQBTcDkAMgAyADKQOYBTcDmAMgAyADKQKQBjcDgAMgAyADKQKYBjcDiAMgBCADQZADaiADQYADahAFIAMgAykCiAU3A5gFIAMgAykCgAU3A5AFIAMgAykDoAU3A/ACIAMgAykDqAU3A/gCIAMgAykC0Ac3A+ACIAMgAykC2Ac3A+gCIAQgA0HwAmogA0HgAmoQBSADIAMpAogFNwOoBSADIAMpAoAFNwOgBSADIAMpA5AFNwPQAiADIAMpA5gFNwPYAiADIAMpAqAGNwPAAiADIAMpAqgGNwPIAiAEIANB0AJqIANBwAJqEAUgAyADKQKIBTcDmAUgAyADKQKABTcDkAUgAyADKQOgBTcDsAIgAyADKQOoBTcDuAIgAyADKQLgBzcDoAIgAyADKQLoBzcDqAIgBCADQbACaiADQaACahAFIAMgAykCiAU3A6gFIAMgAykCgAU3A6AFIAMgAykDkAU3A5ACIAMgAykDmAU3A5gCIAMgAykCsAY3A4ACIAMgAykCuAY3A4gCIAQgA0GQAmogA0GAAmoQBSADIAMpAogFNwOYBSADIAMpAoAFNwOQBSADIAMpA6AFNwPwASADIAMpA6gFNwP4ASADIAMpAvAHNwPgASADIAMpAvgHNwPoASAEIANB8AFqIANB4AFqEAUgAyADKQKIBTcDqAUgAyADKQKABTcDoAUgAyADKQOQBTcD0AEgAyADKQOYBTcD2AEgAyADKQLABjcDwAEgAyADKQLIBjcDyAEgBCADQdABaiADQcABahAFIAMgAykCiAU3A5gFIAMgAykCgAU3A5AFIAMgAykDoAU3A7ABIAMgAykDqAU3A7gBIAMgFSkCADcDoAEgAyAVKQIINwOoASAEIANBsAFqIANBoAFqEAUg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AiAEIAMtAAdB2gBzOgDHAiAEIAMtAAhB2gBzOgDIAiAEIAMtAAlB2gBzOgDJAiAEIAMtAApB2gBzOgDKAiAEIAMtAAtB2gBzOgDLAiAEIAMtAAxB2gBzOgDMAiAEIAMtAA1B2gBzOgDNAiAEIAMtAA5B2gBzOgDOAiAEIAMtAA9B2gBzOgDPAiAJIARBwAJqEBELIAAgAikACDcACCAAIAIpAAA3AAAgBEHgBWogAiAEQYAEahCJASABKAAIIQIgASgADCEDIAEoAAAhBSAEIAQoAuQFIgYgASgABCAEKALUAnNzNgLUBSAEIAQoAuAFIgEgBSAEKALQAnNzNgLQBSAEIAQoAuwFIgUgAyAEKALcAnNzNgLcBSAEIAQoAugFIgMgAiAEKALYAnNzNgLYBSAEIAQpA9AFNwOwAiAEIAQpA9gFNwO4AiAEIAQpA+gCNwOoAiAEIAQpA+ACNwOgAiAEQcAFaiICIARBsAJqIARBoAJqEAUgBCAEKQLIBSIKNwPYBSAEIAQpAsAFIgs3A9AFIAQgCzcDkAIgBCAKNwOYAiAEIAQpA/ACNwOAAiAEIAQpA/gCNwOIAiACIARBkAJqIARBgAJqEAUgBCAEKQLIBSIKNwPYBSAEIAQpAsAFIgs3A9AFIAQgCzcD8AEgBCAKNwP4ASAEIAQpA4ADNwPgASAEIAQpA4gDNwPoASACIARB8AFqIARB4AFqEAUgBCAEKQLIBSIKNwPYBSAEIAQpAsAFIgs3A9AFIAQgCzcD0AEgBCAKNwPYASAEIAQpA5ADNwPAASAEIAQpA5gDNwPIASACIARB0AFqIARBwAFqEAUgBCAEKQLIBSIKNwPYBSAEIAQpAsAFIgs3A9AFIAQgCzcDsAEgBCAKNwO4ASAEIAQpAqADNwOgASAEIAQpAqgDNwOoASACIARBsAFqIARBoAFqEAUgBCAEKQLIBSIKNwPYBSAEIAQpAsAFIgs3A9AFIAQgCzcDkAEgBCAKNwOYASAEIAQpA7ADNwOAASAEIAQpA7gDNwOIASACIARBkAFqIARBgAFqEAUgBCAEKQLIBSIKNwPYBSAEIAQpAsAFIgs3A9AFIAQgCzcDcCAEIAo3A3ggBCAEKQPAAzcDYCAEIAQpA8gDNwNoIAIgBEHwAGogBEHgAGoQBSAEIAQpAsgFIgo3A9gFIAQgBCkCwAUiCzcD0AUgBCALNwNQIAQgCjcDWCAEIAQpA9ADNwNAIAQgBCkD2AM3A0ggAiAEQdAAaiAEQUBrEAUgBCAEKQLIBSIKNwPYBSAEIAQpAsAFIgs3A9AFIAQgCzcDMCAEIAo3AzggBCAEKQPgAzcDICAEIAQpA+gDNwMoIAIgBEEwaiAEQSBqEAUgBCAFIAQoAvwDczYCvAUgBCADIAQoAvgDczYCuAUgBCAGIAQoAvQDczYCtAUgBCABIAQoAvADczYCsAUgBCAEKQLIBSIKNwPYBSAEIAQpAsAFIgs3A9AFIAQgCzcDECAEIAo3AxggBCAEKQK4BTcDCCAEIAQpArAFNwMAIAIgBEEQaiAEECEgBCAEKQLIBSIKNwPYBSAEIAQpAsAFIgs3A9AFIAAgCjcAGCAAIAs3ABAgBEHwBWokAAvZDgIHfwJ+IwBBkAZrIgMkACADQdACaiIEIAIQESADIAEvAAAiAjYC0AQgAyABLwACIgY2AtQEIAMgAS8ABCIHNgLYBCADIAEvAAYiCDYC3AQgAyADKQLQBDcDwAIgAyADKQLYBDcDyAIgAyADKALAAhAINgLABCADIAMoAsQCEAg2AsQEIAMgAygCyAIQCDYCyAQgAyADKALMAhAINgLMBCADQeAEaiIFIARBsAH8CgAAIAUQViABKAAQIQQgASgAFCEFIAEoAAghCSADIAYgASgADCADKAKEBnNzNgK0BCADIAIgCSADKAKABnNzNgKwBCADIAggBSADKAKMBnNzNgK8BCADIAcgBCADKAKIBnNzNgK4BCADIAMoAsQEIAMoAvQFczYClAQgAyADKALABCADKALwBXM2ApAEIAMoAvgFIQEgAygCyAQhBCADIAMoAswEIAMoAvwFczYCnAQgAyABIARzNgKYBCADIAMpA7gENwO4AiADIAMpA7AENwOwAiADIAMpApgENwOoAiADIAMpApAENwOgAiADQaAEaiIBIANBsAJqIANBoAJqEAsgAyADKQKoBCIKNwO4BCADIAMpAqAEIgs3A7AEIAMgAygCxAQgAygC5AVzNgKUBCADIAMoAsAEIAMoAuAFczYCkAQgAyADKALMBCADKALsBXM2ApwEIAMgAygCyAQgAygC6AVzNgKYBCADIAo3A5gCIAMgCzcDkAIgAyADKQKYBDcDiAIgAyADKQKQBDcDgAIgASADQZACaiADQYACahALIAMgAykCqAQiCjcDuAQgAyADKQKgBCILNwOwBCADIAMoAsQEIAMoAtQFczYClAQgAyADKALABCADKALQBXM2ApAEIAMgAygCzAQgAygC3AVzNgKcBCADIAMoAsgEIAMoAtgFczYCmAQgAyAKNwP4ASADIAs3A/ABIAMgAykCmAQ3A+gBIAMgAykCkAQ3A+ABIAEgA0HwAWogA0HgAWoQCyADIAMpAqgEIgo3A7gEIAMgAykCoAQiCzcDsAQgAyADKALEBCADKALEBXM2ApQEIAMgAygCwAQgAygCwAVzNgKQBCADIAMoAswEIAMoAswFczYCnAQgAyADKALIBCADKALIBXM2ApgEIAMgCjcD2AEgAyALNwPQASADIAMpApgENwPIASADIAMpApAENwPAASABIANB0AFqIANBwAFqEAsgAyADKQKoBCIKNwO4BCADIAMpAqAEIgs3A7AEIAMgAygCxAQgAygCtAVzNgKUBCADIAMoAsAEIAMoArAFczYCkAQgAyADKALMBCADKAK8BXM2ApwEIAMgAygCyAQgAygCuAVzNgKYBCADIAo3A7gBIAMgCzcDsAEgAyADKQKYBDcDqAEgAyADKQKQBDcDoAEgASADQbABaiADQaABahALIAMgAykCqAQiCjcDuAQgAyADKQKgBCILNwOwBCADIAMoAsQEIAMoAqQFczYClAQgAyADKALABCADKAKgBXM2ApAEIAMgAygCzAQgAygCrAVzNgKcBCADIAMoAsgEIAMoAqgFczYCmAQgAyAKNwOYASADIAs3A5ABIAMgAykCmAQ3A4gBIAMgAykCkAQ3A4ABIAEgA0GQAWogA0GAAWoQCyADIAMpAqgEIgo3A7gEIAMgAykCoAQiCzcDsAQgAyADKALEBCADKAKUBXM2ApQEIAMgAygCwAQgAygCkAVzNgKQBCADIAMoAswEIAMoApwFczYCnAQgAyADKALIBCADKAKYBXM2ApgEIAMgCjcDeCADIAs3A3AgAyADKQKYBDcDaCADIAMpApAENwNgIAEgA0HwAGogA0HgAGoQCyADIAMpAqgEIgo3A7gEIAMgAykCoAQiCzcDsAQgAyADKALEBCADKAKEBXM2ApQEIAMgAygCwAQgAygCgAVzNgKQBCADIAMoAswEIAMoAowFczYCnAQgAyADKALIBCAD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KCAEIAQpAoAENwMgIAEgBEEwaiAEQSBqEAUgBCAFIAQoAuwDczYC/AMgBCADIAQoAugDczYC+AMgBCACIAQoAuQDczYC9AMgBCAGIAQoAuADczYC8AMgBCAEKQKYBCIKNwOoBCAEIAQpApAEIgs3A6AEIAQgCzcDECAEIAo3AxggBCAEKQL4AzcDCCAEIAQpAvADNwMAIAEgBEEQaiAEECEgBCAEKQKYBCIKNwOoBCAEIAQpApAEIgs3A6AEIAAgCjcAECAAIAs3AAggBEGwBGokAAvZBwIDfwJ+IwBBwAVrIgMkACADQcACaiIEIAIQESADQZAEaiICIARBsAH8CgAAIAIQViABKAAIIQIgASgADCEEIAEoAAAhBSADIAMoArQFIAEoAARzNgKEBCADIAUgAygCsAVzNgKABCADIAQgAygCvAVzNgKMBCADIAIgAygCuAVzNgKIBCADIAMpA6AFNwOgAiADIAMpA6gFNwOoAiADIAMpA4AENwOwAiADIAMpA4gENwO4AiADQfADaiIBIANBsAJqIANBoAJqEAsgAyADKQL4AyIGNwOIBCADIAMpAvADIgc3A4AEIAMgBzcDkAIgAyAGNwOYAiADIAMpA5AFNwOAAiADIAMpA5gFNwOIAiABIANBkAJqIANBgAJqEAsgAyADKQL4AyIGNwOIBCADIAMpAvADIgc3A4AEIAMgBzcD8AEgAyAGNwP4ASADIAMpA4AFNwPgASADIAMpA4gFNwPoASABIANB8AFqIANB4AFqEAsgAyADKQL4AyIGNwOIBCADIAMpAvADIgc3A4AEIAMgBzcD0AEgAyAGNwPYASADIAMpA/AENwPAASADIAMpA/gENwPIASABIANB0AFqIANBwAFqEAsgAyADKQL4AyIGNwOIBCADIAMpAvADIgc3A4AEIAMgBzcDsAEgAyAGNwO4ASADIAMpA+AENwOgASADIAMpA+gENwOoASABIANBsAFqIANBoAFqEAsgAyADKQL4AyIGNwOIBCADIAMpAvADIgc3A4AEIAMgBzcDkAEgAyAGNwOYASADIAMpA9AENwOAASADIAMpA9gENwOIASABIANBkAFqIANBgAFqEAsgAyADKQL4AyIGNwOIBCADIAMpAvADIgc3A4AEIAMgBzcDcCADIAY3A3ggAyADKQPABDcDYCADIAMpA8gENwNo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AL3irP9xQtb/yj4t/2ZACP9OrhD+hXVE/wBBsBMLAQEAQdATC7ABJuiVj8KyJ7BFw/SJ8u+Y8NXfrAXTxjM5sTgCiG1T/AXHF2pwPU3YT7o8C3YNEGcPKiBT+iw5zMZOx/13kqwDeuz///////////////////////////////////////9/7f///////////////////////////////////////3/u////////////////////////////////////////f+3T9VwaYxJY1pz3ot753hQAQY8VC/zwARCFO4wBvfEk//glwwFg3DcAt0w+/8NCPQAyTKQB4aRM/0w9o/91Ph8AUZFA/3ZBDgCic9b/BoouAHzm9P8Kio8ANBrCALj0TACBjykBvvQT/3uqev9igUQAedWTAFZlHv+hZ5sAjFlD/+/lvgFDC7UAxvCJ/u5FvP/qcTz/Jf85/0Wytv6A0LMAdhp9/gMH1v/xMk3/VcvF/9OH+v8ZMGT/u9W0/hFYaQBT0Z4BBXNiAASuPP6rN27/2bUR/xS8qgCSnGb+V9au/3J6mwHpLKoAfwjvAdbs6gCvBdsAMWo9/wZC0P8Cam7/UeoT/9drwP9Dl+4AEyps/+VVcQEyRIf/EWoJADJnAf9QAagBI5ge/xCouQE4Wej/ZdL8ACn6RwDMqk//Di7v/1BN7wC91kv/EY35ACZQTP++VXUAVuSqAJzY0AHDz6T/lkJM/6/hEP+NUGIBTNvyAMaicgAu2pgAmyvx/pugaP+yCfz+ZG7UAA4FpwDp76P/HJedAWWSCv/+nkb+R/nkAFgeMgBEOqD/vxhoAYFCgf/AMlX/CLOK/yb6yQBzUKAAg+ZxAH1YkwBaRMcA/UyeABz/dgBx+v4AQksuAObaKwDleLoBlEQrAIh87gG7a8X/VDX2/zN0/v8zu6UAAhGvAEJUoAH3Oh4AI0E1/kXsvwAthvUBo3vdACBuFP80F6UAutZHAOmwYADy7zYBOVmKAFMAVP+IoGQAXI54/mh8vgC1sT7/+ilVAJiCKgFg/PYAl5c//u+FPgAgOJwALae9/46FswGDVtMAu7OW/vqqDv9EcRX/3ro7/0IH8QFFBkgAVpxs/jenWQBtNNv+DbAX/8Qsav/vlUf/pIx9/5+tAQAzKecAkT4hAIpvXQG5U0UAkHMuAGGXEP8Y5BoA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zLwm/vVzNP+/cUn+v2xF/xZF9QEXy7IAqmOqAEH4bwAlbJn/QCVFAABYPv5ZlJD/v0TgAfEnNQApy+3/kX7C/90q/f8ZY5cAYf3fAUpzMf8Gr0j/O7DLAHy3+QHk5GMAgQzP/qjAw//MsBD+mOqrAE0lVf8heIf/jsLjAR/WOgDVu33/6C48/750Kv6XshP/Mz7t/szswQDC6DwArCKd/70QuP5nA1//jekk/ikZC/8Vw6YAdvUtAEPVlf+fDBL/u6TjAaAZBQAMTsMBK8XhADCOKf7Emzz/38cSAZGInAD8dan+keLuAO8XawBttbz/5nAx/kmq7f/nt+P/UNwUAMJrfwF/zWUALjTFAdKrJP9YA1r/OJeNAGC7//8qTsgA/kZGAfR9qADMRIoBfNdGAGZCyP4RNOQAddyP/sv4ewA4Eq7/upek/zPo0AGg5Cv/+R0ZAUS+PwANAAAAAP8AAAAA9QAAAAAAAPsAAAAAAAD9AAAAAPMAAAAABwAAAAAAAwAAAADzAAAAAAUAAAAAAAAAAAsAAAAAAAsAAAAA8wAAAAAAAP0AAAAAAP8AAAAAAwAAAAD1AAAAAAAAAA8AAAAAAP8AAAAA/wAAAAAHAAAAAAUAQYyHAgsBAQBBsIcCCwEBAEHQhwILgSvg63p8O0G4rhZW4/rxn8Rq2gmN65wysf2GYgUWX0m4AF+clbyjUIwksdCxVZyD71sERFzEWByOhtgiTt3QnxFX7P///////////////////////////////////////3/t////////////////////////////////////////f+7///////////////////////////////////////9/AAECBAgQIECAGzYAAAAAAMZjY6X4fHyE7nd3mfZ7e43/8vIN1mtrvd5vb7GRxcVUYDAwUAIBAQPOZ2epVisrfef+/hm119diTaur5ux2dpqPyspFH4KCnYnJyUD6fX2H7/r6FbJZWeuOR0fJ+/DwC0Gtreyz1NRnX6Ki/UWvr+ojnJy/U6Sk9+RycpabwMBbdbe3wuH9/Rw9k5OuTCYmamw2Nlp+Pz9B9ff3AoPMzE9oNDRcUaWl9NHl5TT58fEI4nFxk6vY2HNiMTFTKhUVPwgEBAyVx8dSRiMjZZ3Dw14wGBgoN5aWoQoFBQ8vmpq1DgcHCSQSEjYb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"), A4((await (async function(A5, g3, C4) {
        return (async function(A6, g4) {
          try {
            var C5 = await (async function(A7) {
              return (function(A8) {
                if (ArrayBuffer.isView(A8)) return A8;
                if (A8 == F2 && E2) return new Uint8Array(E2);
                if (I2) return I2(A8);
                throw "both async and sync fetching of the wasm failed";
              })(A7);
            })(A6);
            return await WebAssembly.instantiate(C5, g4);
          } catch (A7) {
            M2(`failed to asynchronously prepare wasm: ${A7}`), Y2(A7);
          }
        })(g3, C4);
      })(0, F2, C3)).instance));
    })(), (function() {
      function A4() {
        g2.calledRun = true, U2 || (G2 = true, i2?.(g2), g2.onRuntimeInitialized?.(), (function() {
          if (g2.postRun) for ("function" == typeof g2.postRun && (g2.postRun = [g2.postRun]); g2.postRun.length; ) H2(g2.postRun.shift());
          N2(K2);
        })());
      }
      !(function() {
        if (g2.preRun) for ("function" == typeof g2.preRun && (g2.preRun = [g2.preRun]); g2.preRun.length; ) f2(g2.preRun.shift());
        N2(a2);
      })(), g2.setStatus ? (g2.setStatus("Running..."), setTimeout(() => {
        setTimeout(() => g2.setStatus(""), 1), A4();
      }, 1)) : A4();
    })(), G2 ? g2 : new Promise((A4, I3) => {
      i2 = A4, D2 = I3;
    });
  }
  var libsodium_default = A;

  // node_modules/libsodium-wrappers/dist/modules-esm/libsodium-wrappers.mjs
  var r;
  var t = {};
  if (void 0 === globalThis.crypto || "function" != typeof globalThis.crypto.getRandomValues) throw new Error("globalThis.crypto.getRandomValues is not available. The ESM build of libsodium requires a secure random source (available in all browsers and Node.js 19+).");
  var a = "function" == typeof (_ = libsodium_default) ? _ : null != _ && "function" == typeof _.default ? _.default : null;
  var _;
  var n = (function(e) {
    return null != e && void 0 !== e.ready ? e : null != e && null != e.default && void 0 !== e.default.ready ? e.default : null;
  })(libsodium_default);
  var s = (null != a ? a({ getRandomValue: function() {
    var e = new Uint32Array(1);
    return globalThis.crypto.getRandomValues(e), e[0] >>> 0;
  } }) : null != n ? n.ready.then(function() {
    return n;
  }) : Promise.reject(new Error("Unsupported libsodium ESM export shape"))).then(function(e) {
    r = e, t.libsodium = r, (function() {
      if (r._sodium_init() < 0) throw new Error("libsodium was not correctly initialized.");
      for (var e2 = ["crypto_aead_aegis128l_decrypt", "crypto_aead_aegis128l_decrypt_detached", "crypto_aead_aegis128l_encrypt", "crypto_aead_aegis128l_encrypt_detached", "crypto_aead_aegis128l_keygen", "crypto_aead_aegis256_decrypt", "crypto_aead_aegis256_decrypt_detached", "crypto_aead_aegis256_encrypt", "crypto_aead_aegis256_encrypt_detached", "crypto_aead_aegis256_keygen", "crypto_aead_chacha20poly1305_decrypt", "crypto_aead_chacha20poly1305_decrypt_detached", "crypto_aead_chacha20poly1305_encrypt", "crypto_aead_chacha20poly1305_encrypt_detached", "crypto_aead_chacha20poly1305_ietf_decrypt", "crypto_aead_chacha20poly1305_ietf_decrypt_detached", "crypto_aead_chacha20poly1305_ietf_encrypt", "crypto_aead_chacha20poly1305_ietf_encrypt_detached", "crypto_aead_chacha20poly1305_ietf_keygen", "crypto_aead_chacha20poly1305_keygen", "crypto_aead_xchacha20poly1305_ietf_decrypt", "crypto_aead_xchacha20poly1305_ietf_decrypt_detached", "crypto_aead_xchacha20poly1305_ietf_encrypt", "crypto_aead_xchacha20poly1305_ietf_encrypt_detached", "crypto_aead_xchacha20poly1305_ietf_keygen", "crypto_auth", "crypto_auth_hmacsha256", "crypto_auth_hmacsha256_final", "crypto_auth_hmacsha256_init", "crypto_auth_hmacsha256_keygen", "crypto_auth_hmacsha256_update", "crypto_auth_hmacsha256_verify", "crypto_auth_hmacsha512", "crypto_auth_hmacsha512256", "crypto_auth_hmacsha512256_final", "crypto_auth_hmacsha512256_init", "crypto_auth_hmacsha512256_keygen", "crypto_auth_hmacsha512256_update", "crypto_auth_hmacsha512256_verify", "crypto_auth_hmacsha512_final", "crypto_auth_hmacsha512_init", "crypto_auth_hmacsha512_keygen", "crypto_auth_hmacsha512_update", "crypto_auth_hmacsha512_verify", "crypto_auth_keygen", "crypto_auth_verify", "crypto_box_beforenm", "crypto_box_curve25519xchacha20poly1305_beforenm", "crypto_box_curve25519xchacha20poly1305_detached", "crypto_box_curve25519xchacha20poly1305_detached_afternm", "crypto_box_curve25519xchacha20poly1305_easy", "crypto_box_curve25519xchacha20poly1305_easy_afternm", "crypto_box_curve25519xchacha20poly1305_keypair", "crypto_box_curve25519xchacha20poly1305_open_detached", "crypto_box_curve25519xchacha20poly1305_open_detached_afternm", "crypto_box_curve25519xchacha20poly1305_open_easy", "crypto_box_curve25519xchacha20poly1305_open_easy_afternm", "crypto_box_curve25519xchacha20poly1305_seal", "crypto_box_curve25519xchacha20poly1305_seal_open", "crypto_box_curve25519xchacha20poly1305_seed_keypair", "crypto_box_detached", "crypto_box_easy", "crypto_box_easy_afternm", "crypto_box_keypair", "crypto_box_open_detached", "crypto_box_open_easy", "crypto_box_open_easy_afternm", "crypto_box_seal", "crypto_box_seal_open", "crypto_box_seed_keypair", "crypto_core_ed25519_add", "crypto_core_ed25519_from_hash", "crypto_core_ed25519_from_uniform", "crypto_core_ed25519_is_valid_point", "crypto_core_ed25519_random", "crypto_core_ed25519_scalar_add", "crypto_core_ed25519_scalar_complement", "crypto_core_ed25519_scalar_invert", "crypto_core_ed25519_scalar_mul", "crypto_core_ed25519_scalar_negate", "crypto_core_ed25519_scalar_random", "crypto_core_ed25519_scalar_reduce", "crypto_core_ed25519_scalar_sub", "crypto_core_ed25519_sub", "crypto_core_hchacha20", "crypto_core_hsalsa20", "crypto_core_ristretto255_add", "crypto_core_ristretto255_from_hash", "crypto_core_ristretto255_is_valid_point", "crypto_core_ristretto255_random", "crypto_core_ristretto255_scalar_add", "crypto_core_ristretto255_scalar_complement", "crypto_core_ristretto255_scalar_invert", "crypto_core_ristretto255_scalar_mul", "crypto_core_ristretto255_scalar_negate", "crypto_core_ristretto255_scalar_random", "crypto_core_ristretto255_scalar_reduce", "crypto_core_ristretto255_scalar_sub", "crypto_core_ristretto255_sub", "crypto_generichash", "crypto_generichash_blake2b_salt_personal", "crypto_generichash_final", "crypto_generichash_init", "crypto_generichash_keygen", "crypto_generichash_update", "crypto_hash", "crypto_hash_sha256", "crypto_hash_sha256_final", "crypto_hash_sha256_init", "crypto_hash_sha256_update", "crypto_hash_sha3256", "crypto_hash_sha3256_final", "crypto_hash_sha3256_init", "crypto_hash_sha3256_update", "crypto_hash_sha3512", "crypto_hash_sha3512_final", "crypto_hash_sha3512_init", "crypto_hash_sha3512_update", "crypto_hash_sha512", "crypto_hash_sha512_final", "crypto_hash_sha512_init", "crypto_hash_sha512_update", "crypto_ipcrypt_decrypt", "crypto_ipcrypt_encrypt", "crypto_ipcrypt_keygen", "crypto_ipcrypt_nd_decrypt", "crypto_ipcrypt_nd_encrypt", "crypto_ipcrypt_nd_keygen", "crypto_ipcrypt_ndx_decrypt", "crypto_ipcrypt_ndx_encrypt", "crypto_ipcrypt_ndx_keygen", "crypto_ipcrypt_pfx_decrypt", "crypto_ipcrypt_pfx_encrypt", "crypto_ipcrypt_pfx_keygen", "crypto_kdf_derive_from_key", "crypto_kdf_keygen", "crypto_kem_dec", "crypto_kem_enc", "crypto_kem_keypair", "crypto_kem_mlkem768_dec", "crypto_kem_mlkem768_enc", "crypto_kem_mlkem768_enc_deterministic", "crypto_kem_mlkem768_keypair", "crypto_kem_mlkem768_seed_keypair", "crypto_kem_primitive", "crypto_kem_seed_keypair", "crypto_kem_xwing_dec", "crypto_kem_xwing_enc", "crypto_kem_xwing_enc_deterministic", "crypto_kem_xwing_keypair", "crypto_kem_xwing_seed_keypair", "crypto_kx_client_session_keys", "crypto_kx_keypair", "crypto_kx_seed_keypair", "crypto_kx_server_session_keys", "crypto_onetimeauth", "crypto_onetimeauth_final", "crypto_onetimeauth_init", "crypto_onetimeauth_keygen", "crypto_onetimeauth_update", "crypto_onetimeauth_verify", "crypto_pwhash", "crypto_pwhash_scryptsalsa208sha256", "crypto_pwhash_scryptsalsa208sha256_ll", "crypto_pwhash_scryptsalsa208sha256_str", "crypto_pwhash_scryptsalsa208sha256_str_verify", "crypto_pwhash_str", "crypto_pwhash_str_needs_rehash", "crypto_pwhash_str_verify", "crypto_scalarmult", "crypto_scalarmult_base", "crypto_scalarmult_ed25519", "crypto_scalarmult_ed25519_base", "crypto_scalarmult_ed25519_base_noclamp", "crypto_scalarmult_ed25519_noclamp", "crypto_scalarmult_ristretto255", "crypto_scalarmult_ristretto255_base", "crypto_secretbox_detached", "crypto_secretbox_easy", "crypto_secretbox_keygen", "crypto_secretbox_open_detached", "crypto_secretbox_open_easy", "crypto_secretstream_xchacha20poly1305_init_pull", "crypto_secretstream_xchacha20poly1305_init_push", "crypto_secretstream_xchacha20poly1305_keygen", "crypto_secretstream_xchacha20poly1305_pull", "crypto_secretstream_xchacha20poly1305_push", "crypto_secretstream_xchacha20poly1305_rekey", "crypto_shorthash", "crypto_shorthash_keygen", "crypto_shorthash_siphashx24", "crypto_sign", "crypto_sign_detached", "crypto_sign_ed25519_pk_to_curve25519", "crypto_sign_ed25519_sk_to_curve25519", "crypto_sign_ed25519_sk_to_pk", "crypto_sign_ed25519_sk_to_seed", "crypto_sign_final_create", "crypto_sign_final_verify", "crypto_sign_init", "crypto_sign_keypair", "crypto_sign_open", "crypto_sign_seed_keypair", "crypto_sign_update", "crypto_sign_verify_detached", "crypto_stream_chacha20", "crypto_stream_chacha20_ietf_xor", "crypto_stream_chacha20_ietf_xor_ic", "crypto_stream_chacha20_keygen", "crypto_stream_chacha20_xor", "crypto_stream_chacha20_xor_ic", "crypto_stream_keygen", "crypto_stream_xchacha20_keygen", "crypto_stream_xchacha20_xor", "crypto_stream_xchacha20_xor_ic", "crypto_xof_shake128", "crypto_xof_shake128_init", "crypto_xof_shake128_init_with_domain", "crypto_xof_shake128_squeeze", "crypto_xof_shake128_update", "crypto_xof_shake256", "crypto_xof_shake256_init", "crypto_xof_shake256_init_with_domain", "crypto_xof_shake256_squeeze", "crypto_xof_shake256_update", "crypto_xof_turboshake128", "crypto_xof_turboshake128_init", "crypto_xof_turboshake128_init_with_domain", "crypto_xof_turboshake128_squeeze", "crypto_xof_turboshake128_update", "crypto_xof_turboshake256", "crypto_xof_turboshake256_init", "crypto_xof_turboshake256_init_with_domain", "crypto_xof_turboshake256_squeeze", "crypto_xof_turboshake256_update", "randombytes_buf", "randombytes_buf_deterministic", "randombytes_close", "randombytes_random", "randombytes_set_implementation", "randombytes_stir", "randombytes_uniform", "sodium_bin2ip", "sodium_ip2bin", "sodium_version_string"], a3 = [C, R, P, X, D, G, F, V, q, H, z, W, j, J, Q, Z, $, ee, re, te, ae, _e, ne, se, ce, pe, oe, he, ye, ie, le, ue, de, ve, ge, be, fe, me, ke, xe, Ee, Te, Se, we, Ye, Be, Ke, Ae, Ie, Me, Ne, Le, Ue, Oe, Ce, Re, Pe, Xe, De, Ge, Fe, Ve, qe, He, ze, We, je, Je, Qe, Ze, $e, er, rr, tr, ar, _r, nr, sr, cr, pr, or, hr, yr, ir, lr, ur, dr, vr, gr, br, fr, mr, kr, xr, Er, Tr, Sr, wr, Yr, Br, Kr, Ar, Ir, Mr, Nr, Lr, Ur, Or, Cr, Rr, Pr, Xr, Dr, Gr, Fr, Vr, qr, Hr, zr, Wr, jr, Jr, Qr, Zr, $r, et, rt, tt, at, _t, nt, st, ct, pt, ot, ht, yt, it, lt, ut, dt, vt, gt, bt, ft, mt, kt, xt, Et, Tt, St, wt, Yt, Bt, Kt, At, It, Mt, Nt, Lt, Ut, Ot, Ct, Rt, Pt, Xt, Dt, Gt, Ft, Vt, qt, Ht, zt, Wt, jt, Jt, Qt, Zt, $t, ea, ra, ta, aa, _a, na, sa, ca, pa, oa, ha, ya, ia, la, ua, da, va, ga, ba, fa, ma, ka, xa, Ea, Ta, Sa, wa, Ya, Ba, Ka, Aa, Ia, Ma, Na, La, Ua, Oa, Ca, Ra, Pa, Xa, Da, Ga, Fa, Va, qa, Ha, za, Wa, ja, Ja, Qa, Za, $a, e_, r_, t_, a_, __, n_, s_, c_, p_, o_, h_, y_], _3 = 0; _3 < a3.length; _3++) "function" == typeof r["_" + e2[_3]] && (t[e2[_3]] = a3[_3]);
      var n3 = ["SODIUM_LIBRARY_VERSION_MAJOR", "SODIUM_LIBRARY_VERSION_MINOR", "crypto_aead_aegis128l_ABYTES", "crypto_aead_aegis128l_KEYBYTES", "crypto_aead_aegis128l_MESSAGEBYTES_MAX", "crypto_aead_aegis128l_NPUBBYTES", "crypto_aead_aegis128l_NSECBYTES", "crypto_aead_aegis256_ABYTES", "crypto_aead_aegis256_KEYBYTES", "crypto_aead_aegis256_MESSAGEBYTES_MAX", "crypto_aead_aegis256_NPUBBYTES", "crypto_aead_aegis256_NSECBYTES", "crypto_aead_aes256gcm_ABYTES", "crypto_aead_aes256gcm_KEYBYTES", "crypto_aead_aes256gcm_MESSAGEBYTES_MAX", "crypto_aead_aes256gcm_NPUBBYTES", "crypto_aead_aes256gcm_NSECBYTES", "crypto_aead_chacha20poly1305_ABYTES", "crypto_aead_chacha20poly1305_IETF_ABYTES", "crypto_aead_chacha20poly1305_IETF_KEYBYTES", "crypto_aead_chacha20poly1305_IETF_MESSAGEBYTES_MAX", "crypto_aead_chacha20poly1305_IETF_NPUBBYTES", "crypto_aead_chacha20poly1305_IETF_NSECBYTES", "crypto_aead_chacha20poly1305_KEYBYTES", "crypto_aead_chacha20poly1305_MESSAGEBYTES_MAX", "crypto_aead_chacha20poly1305_NPUBBYTES", "crypto_aead_chacha20poly1305_NSECBYTES", "crypto_aead_chacha20poly1305_ietf_ABYTES", "crypto_aead_chacha20poly1305_ietf_KEYBYTES", "crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX", "crypto_aead_chacha20poly1305_ietf_NPUBBYTES", "crypto_aead_chacha20poly1305_ietf_NSECBYTES", "crypto_aead_xchacha20poly1305_IETF_ABYTES", "crypto_aead_xchacha20poly1305_IETF_KEYBYTES", "crypto_aead_xchacha20poly1305_IETF_MESSAGEBYTES_MAX", "crypto_aead_xchacha20poly1305_IETF_NPUBBYTES", "crypto_aead_xchacha20poly1305_IETF_NSECBYTES", "crypto_aead_xchacha20poly1305_ietf_ABYTES", "crypto_aead_xchacha20poly1305_ietf_KEYBYTES", "crypto_aead_xchacha20poly1305_ietf_MESSAGEBYTES_MAX", "crypto_aead_xchacha20poly1305_ietf_NPUBBYTES", "crypto_aead_xchacha20poly1305_ietf_NSECBYTES", "crypto_auth_BYTES", "crypto_auth_KEYBYTES", "crypto_auth_hmacsha256_BYTES", "crypto_auth_hmacsha256_KEYBYTES", "crypto_auth_hmacsha512256_BYTES", "crypto_auth_hmacsha512256_KEYBYTES", "crypto_auth_hmacsha512_BYTES", "crypto_auth_hmacsha512_KEYBYTES", "crypto_box_BEFORENMBYTES", "crypto_box_MACBYTES", "crypto_box_MESSAGEBYTES_MAX", "crypto_box_NONCEBYTES", "crypto_box_PUBLICKEYBYTES", "crypto_box_SEALBYTES", "crypto_box_SECRETKEYBYTES", "crypto_box_SEEDBYTES", "crypto_box_curve25519xchacha20poly1305_BEFORENMBYTES", "crypto_box_curve25519xchacha20poly1305_MACBYTES", "crypto_box_curve25519xchacha20poly1305_MESSAGEBYTES_MAX", "crypto_box_curve25519xchacha20poly1305_NONCEBYTES", "crypto_box_curve25519xchacha20poly1305_PUBLICKEYBYTES", "crypto_box_curve25519xchacha20poly1305_SEALBYTES", "crypto_box_curve25519xchacha20poly1305_SECRETKEYBYTES", "crypto_box_curve25519xchacha20poly1305_SEEDBYTES", "crypto_box_curve25519xsalsa20poly1305_BEFORENMBYTES", "crypto_box_curve25519xsalsa20poly1305_MACBYTES", "crypto_box_curve25519xsalsa20poly1305_MESSAGEBYTES_MAX", "crypto_box_curve25519xsalsa20poly1305_NONCEBYTES", "crypto_box_curve25519xsalsa20poly1305_PUBLICKEYBYTES", "crypto_box_curve25519xsalsa20poly1305_SECRETKEYBYTES", "crypto_box_curve25519xsalsa20poly1305_SEEDBYTES", "crypto_core_ed25519_BYTES", "crypto_core_ed25519_HASHBYTES", "crypto_core_ed25519_NONREDUCEDSCALARBYTES", "crypto_core_ed25519_SCALARBYTES", "crypto_core_ed25519_UNIFORMBYTES", "crypto_core_hchacha20_CONSTBYTES", "crypto_core_hchacha20_INPUTBYTES", "crypto_core_hchacha20_KEYBYTES", "crypto_core_hchacha20_OUTPUTBYTES", "crypto_core_hsalsa20_CONSTBYTES", "crypto_core_hsalsa20_INPUTBYTES", "crypto_core_hsalsa20_KEYBYTES", "crypto_core_hsalsa20_OUTPUTBYTES", "crypto_core_ristretto255_BYTES", "crypto_core_ristretto255_HASHBYTES", "crypto_core_ristretto255_NONREDUCEDSCALARBYTES", "crypto_core_ristretto255_SCALARBYTES", "crypto_core_salsa2012_CONSTBYTES", "crypto_core_salsa2012_INPUTBYTES", "crypto_core_salsa2012_KEYBYTES", "crypto_core_salsa2012_OUTPUTBYTES", "crypto_core_salsa208_CONSTBYTES", "crypto_core_salsa208_INPUTBYTES", "crypto_core_salsa208_KEYBYTES", "crypto_core_salsa208_OUTPUTBYTES", "crypto_core_salsa20_CONSTBYTES", "crypto_core_salsa20_INPUTBYTES", "crypto_core_salsa20_KEYBYTES", "crypto_core_salsa20_OUTPUTBYTES", "crypto_generichash_BYTES", "crypto_generichash_BYTES_MAX", "crypto_generichash_BYTES_MIN", "crypto_generichash_KEYBYTES", "crypto_generichash_KEYBYTES_MAX", "crypto_generichash_KEYBYTES_MIN", "crypto_generichash_blake2b_BYTES", "crypto_generichash_blake2b_BYTES_MAX", "crypto_generichash_blake2b_BYTES_MIN", "crypto_generichash_blake2b_KEYBYTES", "crypto_generichash_blake2b_KEYBYTES_MAX", "crypto_generichash_blake2b_KEYBYTES_MIN", "crypto_generichash_blake2b_PERSONALBYTES", "crypto_generichash_blake2b_SALTBYTES", "crypto_hash_BYTES", "crypto_hash_sha256_BYTES", "crypto_hash_sha3256_BYTES", "crypto_hash_sha3512_BYTES", "crypto_hash_sha512_BYTES", "crypto_ipcrypt_BYTES", "crypto_ipcrypt_KEYBYTES", "crypto_ipcrypt_NDX_INPUTBYTES", "crypto_ipcrypt_NDX_KEYBYTES", "crypto_ipcrypt_NDX_OUTPUTBYTES", "crypto_ipcrypt_NDX_TWEAKBYTES", "crypto_ipcrypt_ND_INPUTBYTES", "crypto_ipcrypt_ND_KEYBYTES", "crypto_ipcrypt_ND_OUTPUTBYTES", "crypto_ipcrypt_ND_TWEAKBYTES", "crypto_ipcrypt_PFX_BYTES", "crypto_ipcrypt_PFX_KEYBYTES", "crypto_kdf_BYTES_MAX", "crypto_kdf_BYTES_MIN", "crypto_kdf_CONTEXTBYTES", "crypto_kdf_KEYBYTES", "crypto_kdf_blake2b_BYTES_MAX", "crypto_kdf_blake2b_BYTES_MIN", "crypto_kdf_blake2b_CONTEXTBYTES", "crypto_kdf_blake2b_KEYBYTES", "crypto_kdf_hkdf_sha256_BYTES_MAX", "crypto_kdf_hkdf_sha256_BYTES_MIN", "crypto_kdf_hkdf_sha256_KEYBYTES", "crypto_kdf_hkdf_sha512_BYTES_MAX", "crypto_kdf_hkdf_sha512_BYTES_MIN", "crypto_kdf_hkdf_sha512_KEYBYTES", "crypto_kem_CIPHERTEXTBYTES", "crypto_kem_PUBLICKEYBYTES", "crypto_kem_SECRETKEYBYTES", "crypto_kem_SEEDBYTES", "crypto_kem_SHAREDSECRETBYTES", "crypto_kem_mlkem768_CIPHERTEXTBYTES", "crypto_kem_mlkem768_PUBLICKEYBYTES", "crypto_kem_mlkem768_SECRETKEYBYTES", "crypto_kem_mlkem768_SEEDBYTES", "crypto_kem_mlkem768_SHAREDSECRETBYTES", "crypto_kem_xwing_CIPHERTEXTBYTES", "crypto_kem_xwing_PUBLICKEYBYTES", "crypto_kem_xwing_SECRETKEYBYTES", "crypto_kem_xwing_SEEDBYTES", "crypto_kem_xwing_SHAREDSECRETBYTES", "crypto_kx_PUBLICKEYBYTES", "crypto_kx_SECRETKEYBYTES", "crypto_kx_SEEDBYTES", "crypto_kx_SESSIONKEYBYTES", "crypto_onetimeauth_BYTES", "crypto_onetimeauth_KEYBYTES", "crypto_onetimeauth_poly1305_BYTES", "crypto_onetimeauth_poly1305_KEYBYTES", "crypto_pwhash_ALG_ARGON2I13", "crypto_pwhash_ALG_ARGON2ID13", "crypto_pwhash_ALG_DEFAULT", "crypto_pwhash_BYTES_MAX", "crypto_pwhash_BYTES_MIN", "crypto_pwhash_MEMLIMIT_INTERACTIVE", "crypto_pwhash_MEMLIMIT_MAX", "crypto_pwhash_MEMLIMIT_MIN", "crypto_pwhash_MEMLIMIT_MODERATE", "crypto_pwhash_MEMLIMIT_SENSITIVE", "crypto_pwhash_OPSLIMIT_INTERACTIVE", "crypto_pwhash_OPSLIMIT_MAX", "crypto_pwhash_OPSLIMIT_MIN", "crypto_pwhash_OPSLIMIT_MODERATE", "crypto_pwhash_OPSLIMIT_SENSITIVE", "crypto_pwhash_PASSWD_MAX", "crypto_pwhash_PASSWD_MIN", "crypto_pwhash_SALTBYTES", "crypto_pwhash_STRBYTES", "crypto_pwhash_argon2i_BYTES_MAX", "crypto_pwhash_argon2i_BYTES_MIN", "crypto_pwhash_argon2i_MEMLIMIT_INTERACTIVE", "crypto_pwhash_argon2i_MEMLIMIT_MAX", "crypto_pwhash_argon2i_MEMLIMIT_MIN", "crypto_pwhash_argon2i_MEMLIMIT_MODERATE", "crypto_pwhash_argon2i_MEMLIMIT_SENSITIVE", "crypto_pwhash_argon2i_OPSLIMIT_INTERACTIVE", "crypto_pwhash_argon2i_OPSLIMIT_MAX", "crypto_pwhash_argon2i_OPSLIMIT_MIN", "crypto_pwhash_argon2i_OPSLIMIT_MODERATE", "crypto_pwhash_argon2i_OPSLIMIT_SENSITIVE", "crypto_pwhash_argon2i_PASSWD_MAX", "crypto_pwhash_argon2i_PASSWD_MIN", "crypto_pwhash_argon2i_SALTBYTES", "crypto_pwhash_argon2i_STRBYTES", "crypto_pwhash_argon2id_BYTES_MAX", "crypto_pwhash_argon2id_BYTES_MIN", "crypto_pwhash_argon2id_MEMLIMIT_INTERACTIVE", "crypto_pwhash_argon2id_MEMLIMIT_MAX", "crypto_pwhash_argon2id_MEMLIMIT_MIN", "crypto_pwhash_argon2id_MEMLIMIT_MODERATE", "crypto_pwhash_argon2id_MEMLIMIT_SENSITIVE", "crypto_pwhash_argon2id_OPSLIMIT_INTERACTIVE", "crypto_pwhash_argon2id_OPSLIMIT_MAX", "crypto_pwhash_argon2id_OPSLIMIT_MIN", "crypto_pwhash_argon2id_OPSLIMIT_MODERATE", "crypto_pwhash_argon2id_OPSLIMIT_SENSITIVE", "crypto_pwhash_argon2id_PASSWD_MAX", "crypto_pwhash_argon2id_PASSWD_MIN", "crypto_pwhash_argon2id_SALTBYTES", "crypto_pwhash_argon2id_STRBYTES", "crypto_pwhash_scryptsalsa208sha256_BYTES_MAX", "crypto_pwhash_scryptsalsa208sha256_BYTES_MIN", "crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_INTERACTIVE", "crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_MAX", "crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_MIN", "crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_SENSITIVE", "crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_INTERACTIVE", "crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_MAX", "crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_MIN", "crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_SENSITIVE", "crypto_pwhash_scryptsalsa208sha256_PASSWD_MAX", "crypto_pwhash_scryptsalsa208sha256_PASSWD_MIN", "crypto_pwhash_scryptsalsa208sha256_SALTBYTES", "crypto_pwhash_scryptsalsa208sha256_STRBYTES", "crypto_scalarmult_BYTES", "crypto_scalarmult_SCALARBYTES", "crypto_scalarmult_curve25519_BYTES", "crypto_scalarmult_curve25519_SCALARBYTES", "crypto_scalarmult_ed25519_BYTES", "crypto_scalarmult_ed25519_SCALARBYTES", "crypto_scalarmult_ristretto255_BYTES", "crypto_scalarmult_ristretto255_SCALARBYTES", "crypto_secretbox_KEYBYTES", "crypto_secretbox_MACBYTES", "crypto_secretbox_MESSAGEBYTES_MAX", "crypto_secretbox_NONCEBYTES", "crypto_secretbox_xchacha20poly1305_KEYBYTES", "crypto_secretbox_xchacha20poly1305_MACBYTES", "crypto_secretbox_xchacha20poly1305_MESSAGEBYTES_MAX", "crypto_secretbox_xchacha20poly1305_NONCEBYTES", "crypto_secretbox_xsalsa20poly1305_KEYBYTES", "crypto_secretbox_xsalsa20poly1305_MACBYTES", "crypto_secretbox_xsalsa20poly1305_MESSAGEBYTES_MAX", "crypto_secretbox_xsalsa20poly1305_NONCEBYTES", "crypto_secretstream_xchacha20poly1305_ABYTES", "crypto_secretstream_xchacha20poly1305_HEADERBYTES", "crypto_secretstream_xchacha20poly1305_KEYBYTES", "crypto_secretstream_xchacha20poly1305_MESSAGEBYTES_MAX", "crypto_secretstream_xchacha20poly1305_TAG_FINAL", "crypto_secretstream_xchacha20poly1305_TAG_MESSAGE", "crypto_secretstream_xchacha20poly1305_TAG_PUSH", "crypto_secretstream_xchacha20poly1305_TAG_REKEY", "crypto_shorthash_BYTES", "crypto_shorthash_KEYBYTES", "crypto_shorthash_siphash24_BYTES", "crypto_shorthash_siphash24_KEYBYTES", "crypto_shorthash_siphashx24_BYTES", "crypto_shorthash_siphashx24_KEYBYTES", "crypto_sign_BYTES", "crypto_sign_MESSAGEBYTES_MAX", "crypto_sign_PUBLICKEYBYTES", "crypto_sign_SECRETKEYBYTES", "crypto_sign_SEEDBYTES", "crypto_sign_ed25519_BYTES", "crypto_sign_ed25519_MESSAGEBYTES_MAX", "crypto_sign_ed25519_PUBLICKEYBYTES", "crypto_sign_ed25519_SECRETKEYBYTES", "crypto_sign_ed25519_SEEDBYTES", "crypto_stream_KEYBYTES", "crypto_stream_MESSAGEBYTES_MAX", "crypto_stream_NONCEBYTES", "crypto_stream_chacha20_IETF_KEYBYTES", "crypto_stream_chacha20_IETF_MESSAGEBYTES_MAX", "crypto_stream_chacha20_IETF_NONCEBYTES", "crypto_stream_chacha20_KEYBYTES", "crypto_stream_chacha20_MESSAGEBYTES_MAX", "crypto_stream_chacha20_NONCEBYTES", "crypto_stream_chacha20_ietf_KEYBYTES", "crypto_stream_chacha20_ietf_MESSAGEBYTES_MAX", "crypto_stream_chacha20_ietf_NONCEBYTES", "crypto_stream_salsa2012_KEYBYTES", "crypto_stream_salsa2012_MESSAGEBYTES_MAX", "crypto_stream_salsa2012_NONCEBYTES", "crypto_stream_salsa208_KEYBYTES", "crypto_stream_salsa208_MESSAGEBYTES_MAX", "crypto_stream_salsa208_NONCEBYTES", "crypto_stream_salsa20_KEYBYTES", "crypto_stream_salsa20_MESSAGEBYTES_MAX", "crypto_stream_salsa20_NONCEBYTES", "crypto_stream_xchacha20_KEYBYTES", "crypto_stream_xchacha20_MESSAGEBYTES_MAX", "crypto_stream_xchacha20_NONCEBYTES", "crypto_stream_xsalsa20_KEYBYTES", "crypto_stream_xsalsa20_MESSAGEBYTES_MAX", "crypto_stream_xsalsa20_NONCEBYTES", "crypto_verify_16_BYTES", "crypto_verify_32_BYTES", "crypto_verify_64_BYTES", "crypto_xof_shake128_BLOCKBYTES", "crypto_xof_shake128_STATEBYTES", "crypto_xof_shake256_BLOCKBYTES", "crypto_xof_shake256_STATEBYTES", "crypto_xof_turboshake128_BLOCKBYTES", "crypto_xof_turboshake128_STATEBYTES", "crypto_xof_turboshake256_BLOCKBYTES", "crypto_xof_turboshake256_STATEBYTES"];
      for (_3 = 0; _3 < n3.length; _3++) "function" == typeof (c3 = r["_" + n3[_3].toLowerCase()]) && (t[n3[_3]] = c3());
      var s3 = ["SODIUM_VERSION_STRING", "crypto_kem_PRIMITIVE", "crypto_pwhash_STRPREFIX", "crypto_pwhash_argon2i_STRPREFIX", "crypto_pwhash_argon2id_STRPREFIX", "crypto_pwhash_scryptsalsa208sha256_STRPREFIX"];
      for (_3 = 0; _3 < s3.length; _3++) {
        var c3;
        "function" == typeof (c3 = r["_" + s3[_3].toLowerCase()]) && (t[s3[_3]] = r.UTF8ToString(c3()));
      }
    })();
    var a2 = new Uint8Array([98, 97, 108, 108, 115]), _2 = t.randombytes_buf(t.crypto_secretbox_NONCEBYTES), n2 = t.randombytes_buf(t.crypto_secretbox_KEYBYTES), s2 = t.crypto_secretbox_easy(a2, _2, n2), c2 = t.crypto_secretbox_open_easy(s2, _2, n2);
    if (!t.memcmp(a2, c2)) throw new Error("Initialization self-test failed");
  });
  function c() {
    return Object.keys(t).sort();
  }
  function p(e) {
    if (!(e instanceof Uint8Array)) throw new TypeError("Only Uint8Array instances can be incremented");
    for (var r2 = 256, t2 = 0, a2 = e.length; t2 < a2; t2++) r2 >>= 8, r2 += e[t2], e[t2] = 255 & r2;
  }
  function o(e, r2) {
    if (!(e instanceof Uint8Array && r2 instanceof Uint8Array)) throw new TypeError("Only Uint8Array instances can be added");
    var t2 = e.length, a2 = 0, _2 = 0;
    if (r2.length !== e.length) throw new TypeError("Arguments must have the same length");
    for (_2 = 0; _2 < t2; _2++) a2 >>= 8, a2 += e[_2] + r2[_2], e[_2] = 255 & a2;
  }
  function h(e) {
    if (!(e instanceof Uint8Array)) throw new TypeError("Only Uint8Array instances can be checked");
    for (var r2 = 0, t2 = 0, a2 = e.length; t2 < a2; t2++) r2 |= e[t2];
    return 0 === r2;
  }
  function y(e) {
    if (!(e instanceof Uint8Array)) throw new TypeError("Only Uint8Array instances can be wiped");
    for (var r2 = 0, t2 = e.length; r2 < t2; r2++) e[r2] = 0;
  }
  function i(e, r2) {
    if (!(e instanceof Uint8Array && r2 instanceof Uint8Array)) throw new TypeError("Only Uint8Array instances can be compared");
    if (e.length !== r2.length) throw new TypeError("Only instances of identical length can be compared");
    for (var t2 = 0, a2 = 0, _2 = e.length; a2 < _2; a2++) t2 |= e[a2] ^ r2[a2];
    return 0 === t2;
  }
  function l(e, r2) {
    if (!(e instanceof Uint8Array && r2 instanceof Uint8Array)) throw new TypeError("Only Uint8Array instances can be compared");
    if (e.length !== r2.length) throw new TypeError("Only instances of identical length can be compared");
    for (var t2 = 0, a2 = 1, _2 = e.length; _2-- > 0; ) t2 |= r2[_2] - e[_2] >> 8 & a2, a2 &= (r2[_2] ^ e[_2]) - 1 >> 8;
    return t2 + t2 + a2 - 1;
  }
  function u(e, t2) {
    if (!(e instanceof Uint8Array)) throw new TypeError("buffer must be a Uint8Array");
    if ((t2 |= 0) <= 0) throw new Error("block size must be > 0");
    var a2, _2 = [], n2 = A2(4), s2 = 1, c2 = 0, p2 = 0 | e.length, o2 = new B(p2 + t2);
    _2.push(n2), _2.push(o2.address);
    for (var h2 = o2.address, y2 = o2.address + p2 + t2; h2 < y2; h2++) r.HEAPU8[h2] = e[c2], c2 += s2 = 1 & ~((65535 & ((p2 -= s2) >>> 48 | p2 >>> 32 | p2 >>> 16 | p2)) - 1 >> 16);
    return 0 !== r._sodium_pad(n2, o2.address, e.length, t2, o2.length) && N(_2, "internal error"), o2.length = r.getValue(n2, "i32"), a2 = o2.to_Uint8Array(), M(_2), a2;
  }
  function d(e, t2) {
    if (!(e instanceof Uint8Array)) throw new TypeError("buffer must be a Uint8Array");
    if ((t2 |= 0) <= 0) throw new Error("block size must be > 0");
    var a2 = [], _2 = K(e), n2 = A2(4);
    return a2.push(_2), a2.push(n2), 0 !== r._sodium_unpad(n2, _2, e.length, t2) && N(a2, "unsupported/invalid padding"), e = (e = new Uint8Array(e)).subarray(0, r.getValue(n2, "i32")), M(a2), e;
  }
  function v(e) {
    if ("function" == typeof TextEncoder) return new TextEncoder().encode(e);
    e = unescape(encodeURIComponent(e));
    for (var r2 = new Uint8Array(e.length), t2 = 0, a2 = e.length; t2 < a2; t2++) r2[t2] = e.charCodeAt(t2);
    return r2;
  }
  function g(e) {
    if ("function" == typeof TextDecoder) return new TextDecoder("utf-8", { fatal: true }).decode(e);
    var r2 = 8192, t2 = Math.ceil(e.length / r2);
    if (t2 <= 1) try {
      return decodeURIComponent(escape(String.fromCharCode.apply(null, e)));
    } catch (e2) {
      throw new TypeError("The encoded data was not valid.");
    }
    for (var a2 = "", _2 = 0, n2 = 0; n2 < t2; n2++) {
      var s2 = Array.prototype.slice.call(e, n2 * r2 + _2, (n2 + 1) * r2 + _2);
      if (0 !== s2.length) {
        var c2, p2 = s2.length, o2 = 0;
        do {
          var h2 = s2[--p2];
          h2 >= 240 ? (o2 = 4, c2 = true) : h2 >= 224 ? (o2 = 3, c2 = true) : h2 >= 192 ? (o2 = 2, c2 = true) : h2 < 128 && (o2 = 1, c2 = true);
        } while (!c2);
        for (var y2 = o2 - (s2.length - p2), i2 = 0; i2 < y2; i2++) _2--, s2.pop();
        a2 += g(s2);
      }
    }
    return a2;
  }
  function b(e) {
    var t2, a2 = [], _2 = new B((e = O(a2, e, "input")).length / 2), n2 = K(e), s2 = A2(4);
    return a2.push(n2), a2.push(_2.address), a2.push(s2), 0 !== r._sodium_hex2bin(_2.address, _2.length, n2, e.length, 0, 0, s2) && N(a2, "invalid input"), r.getValue(s2, "i32") - n2 !== e.length && N(a2, "incomplete input"), t2 = _2.to_Uint8Array(), M(a2), t2;
  }
  function f(e) {
    e = O(null, e, "input");
    for (var r2, t2, a2, _2 = "", n2 = 0; n2 < e.length; n2++) a2 = 87 + (t2 = 15 & e[n2]) + (t2 - 10 >> 8 & -39) << 8 | 87 + (r2 = e[n2] >>> 4) + (r2 - 10 >> 8 & -39), _2 += String.fromCharCode(255 & a2) + String.fromCharCode(a2 >>> 8);
    return _2;
  }
  var m = { ORIGINAL: 1, ORIGINAL_NO_PADDING: 3, URLSAFE: 5, URLSAFE_NO_PADDING: 7 };
  function k(e) {
    if (void 0 === e) return m.URLSAFE_NO_PADDING;
    if (e !== m.ORIGINAL && e !== m.ORIGINAL_NO_PADDING && e !== m.URLSAFE && e !== m.URLSAFE_NO_PADDING) throw new Error("unsupported base64 variant");
    return e;
  }
  function x(e, t2) {
    t2 = k(t2);
    var a2, _2 = [], n2 = new B(3 * (e = O(_2, e, "input")).length / 4), s2 = K(e), c2 = A2(4), p2 = A2(4);
    return _2.push(s2), _2.push(n2.address), _2.push(c2), _2.push(p2), 0 !== r._sodium_base642bin(n2.address, n2.length, s2, e.length, 0, c2, p2, t2) && N(_2, "invalid input"), r.getValue(p2, "i32") - s2 !== e.length && N(_2, "incomplete input"), n2.length = r.getValue(c2, "i32"), a2 = n2.to_Uint8Array(), M(_2), a2;
  }
  function E(e, t2) {
    t2 = k(t2);
    var a2 = [];
    e = O(a2, e, "input");
    var _2, n2 = 0 | Math.floor(e.length / 3), s2 = e.length - 3 * n2, c2 = 4 * n2 + (0 !== s2 ? 2 & t2 ? 2 + (s2 >>> 1) : 4 : 0), p2 = new B(c2 + 1), o2 = K(e);
    return a2.push(o2), a2.push(p2.address), 0 === r._sodium_bin2base64(p2.address, p2.length, o2, e.length, t2) && N(a2, "conversion failed"), p2.length = c2, _2 = g(p2.to_Uint8Array()), M(a2), _2;
  }
  function T() {
    return ["uint8array", "text", "hex", "base64"];
  }
  function S(e, r2) {
    var t2 = r2 || "uint8array";
    if (!w(t2)) throw new Error(t2 + " output format is not available");
    if (e instanceof B) {
      if ("uint8array" === t2) return e.to_Uint8Array();
      if ("text" === t2) return g(e.to_Uint8Array());
      if ("hex" === t2) return f(e.to_Uint8Array());
      if ("base64" === t2) return E(e.to_Uint8Array(), m.URLSAFE_NO_PADDING);
      throw new Error('What is output format "' + t2 + '"?');
    }
    if ("object" == typeof e) {
      for (var a2 = Object.keys(e), _2 = {}, n2 = 0; n2 < a2.length; n2++) _2[a2[n2]] = S(e[a2[n2]], t2);
      return _2;
    }
    if ("string" == typeof e) return e;
    throw new TypeError("Cannot format output");
  }
  function w(e) {
    for (var r2 = ["uint8array", "text", "hex", "base64"], t2 = 0; t2 < r2.length; t2++) if (r2[t2] === e) return true;
    return false;
  }
  function Y(e) {
    if (e) {
      if ("string" != typeof e) throw new TypeError("When defined, the output format must be a string");
      if (!w(e)) throw new Error(e + " is not a supported output format");
    }
  }
  function B(e) {
    this.length = e, this.address = A2(e);
  }
  function K(e) {
    var t2 = A2(e.length);
    return r.HEAPU8.set(e, t2), t2;
  }
  function A2(e) {
    var t2 = r._malloc(e);
    if (0 === t2) throw { message: "_malloc() failed", length: e };
    return t2;
  }
  function I(e) {
    r._free(e);
  }
  function M(e) {
    if (e) for (var r2 = 0; r2 < e.length; r2++) I(e[r2]);
  }
  function N(e, r2) {
    throw M(e), new Error(r2);
  }
  function L(e, r2) {
    throw M(e), new TypeError(r2);
  }
  function U(e, r2, t2) {
    null == r2 && L(e, t2 + " cannot be null or undefined");
  }
  function O(e, r2, t2) {
    return U(e, r2, t2), r2 instanceof Uint8Array ? r2 : "string" == typeof r2 ? v(r2) : void L(e, "unsupported input type for " + t2);
  }
  function C(e, t2, a2, _2, n2, s2) {
    var c2 = [];
    Y(s2);
    var p2 = null;
    null != e && (p2 = K(e = O(c2, e, "secret_nonce")), e.length, c2.push(p2)), t2 = O(c2, t2, "ciphertext");
    var o2, h2 = r._crypto_aead_aegis128l_abytes(), y2 = t2.length;
    y2 < h2 && L(c2, "ciphertext is too short"), o2 = K(t2), c2.push(o2);
    var i2 = null, l2 = 0;
    null != a2 && (i2 = K(a2 = O(c2, a2, "additional_data")), l2 = a2.length, c2.push(i2)), _2 = O(c2, _2, "public_nonce");
    var u2, d2 = 0 | r._crypto_aead_aegis128l_npubbytes();
    _2.length !== d2 && L(c2, "invalid public_nonce length"), u2 = K(_2), c2.push(u2), n2 = O(c2, n2, "key");
    var v2, g2 = 0 | r._crypto_aead_aegis128l_keybytes();
    n2.length !== g2 && L(c2, "invalid key length"), v2 = K(n2), c2.push(v2);
    var b2 = new B(y2 - r._crypto_aead_aegis128l_abytes() | 0), f2 = b2.address;
    if (c2.push(f2), 0 === r._crypto_aead_aegis128l_decrypt(f2, null, p2, o2, y2, 0, i2, l2, 0, u2, v2)) {
      var m2 = S(b2, s2);
      return M(c2), m2;
    }
    N(c2, "ciphertext cannot be decrypted using that key");
  }
  function R(e, t2, a2, _2, n2, s2, c2) {
    var p2 = [];
    Y(c2);
    var o2 = null;
    null != e && (o2 = K(e = O(p2, e, "secret_nonce")), e.length, p2.push(o2));
    var h2 = K(t2 = O(p2, t2, "ciphertext")), y2 = t2.length;
    p2.push(h2), a2 = O(p2, a2, "mac");
    var i2, l2 = 0 | r._crypto_aead_aegis128l_abytes();
    a2.length !== l2 && L(p2, "invalid mac length"), i2 = K(a2), p2.push(i2);
    var u2 = null, d2 = 0;
    null != _2 && (u2 = K(_2 = O(p2, _2, "additional_data")), d2 = _2.length, p2.push(u2)), n2 = O(p2, n2, "public_nonce");
    var v2, g2 = 0 | r._crypto_aead_aegis128l_npubbytes();
    n2.length !== g2 && L(p2, "invalid public_nonce length"), v2 = K(n2), p2.push(v2), s2 = O(p2, s2, "key");
    var b2, f2 = 0 | r._crypto_aead_aegis128l_keybytes();
    s2.length !== f2 && L(p2, "invalid key length"), b2 = K(s2), p2.push(b2);
    var m2 = new B(0 | y2), k2 = m2.address;
    if (p2.push(k2), 0 === r._crypto_aead_aegis128l_decrypt_detached(k2, o2, h2, y2, 0, i2, u2, d2, 0, v2, b2)) {
      var x2 = S(m2, c2);
      return M(p2), x2;
    }
    N(p2, "ciphertext cannot be decrypted using that key");
  }
  function P(e, t2, a2, _2, n2, s2) {
    var c2 = [];
    Y(s2);
    var p2 = K(e = O(c2, e, "message")), o2 = e.length;
    c2.push(p2);
    var h2 = null, y2 = 0;
    null != t2 && (h2 = K(t2 = O(c2, t2, "additional_data")), y2 = t2.length, c2.push(h2));
    var i2 = null;
    null != a2 && (i2 = K(a2 = O(c2, a2, "secret_nonce")), a2.length, c2.push(i2)), _2 = O(c2, _2, "public_nonce");
    var l2, u2 = 0 | r._crypto_aead_aegis128l_npubbytes();
    _2.length !== u2 && L(c2, "invalid public_nonce length"), l2 = K(_2), c2.push(l2), n2 = O(c2, n2, "key");
    var d2, v2 = 0 | r._crypto_aead_aegis128l_keybytes();
    n2.length !== v2 && L(c2, "invalid key length"), d2 = K(n2), c2.push(d2);
    var g2 = new B(o2 + r._crypto_aead_aegis128l_abytes() | 0), b2 = g2.address;
    if (c2.push(b2), 0 === r._crypto_aead_aegis128l_encrypt(b2, null, p2, o2, 0, h2, y2, 0, i2, l2, d2)) {
      var f2 = S(g2, s2);
      return M(c2), f2;
    }
    N(c2, "invalid usage");
  }
  function X(e, t2, a2, _2, n2, s2) {
    var c2 = [];
    Y(s2);
    var p2 = K(e = O(c2, e, "message")), o2 = e.length;
    c2.push(p2);
    var h2 = null, y2 = 0;
    null != t2 && (h2 = K(t2 = O(c2, t2, "additional_data")), y2 = t2.length, c2.push(h2));
    var i2 = null;
    null != a2 && (i2 = K(a2 = O(c2, a2, "secret_nonce")), a2.length, c2.push(i2)), _2 = O(c2, _2, "public_nonce");
    var l2, u2 = 0 | r._crypto_aead_aegis128l_npubbytes();
    _2.length !== u2 && L(c2, "invalid public_nonce length"), l2 = K(_2), c2.push(l2), n2 = O(c2, n2, "key");
    var d2, v2 = 0 | r._crypto_aead_aegis128l_keybytes();
    n2.length !== v2 && L(c2, "invalid key length"), d2 = K(n2), c2.push(d2);
    var g2 = new B(0 | o2), b2 = g2.address;
    c2.push(b2);
    var f2 = new B(0 | r._crypto_aead_aegis128l_abytes()), m2 = f2.address;
    if (c2.push(m2), 0 === r._crypto_aead_aegis128l_encrypt_detached(b2, m2, null, p2, o2, 0, h2, y2, 0, i2, l2, d2)) {
      var k2 = S({ ciphertext: g2, mac: f2 }, s2);
      return M(c2), k2;
    }
    N(c2, "invalid usage");
  }
  function D(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_aead_aegis128l_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_aead_aegis128l_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function G(e, t2, a2, _2, n2, s2) {
    var c2 = [];
    Y(s2);
    var p2 = null;
    null != e && (p2 = K(e = O(c2, e, "secret_nonce")), e.length, c2.push(p2)), t2 = O(c2, t2, "ciphertext");
    var o2, h2 = r._crypto_aead_aegis256_abytes(), y2 = t2.length;
    y2 < h2 && L(c2, "ciphertext is too short"), o2 = K(t2), c2.push(o2);
    var i2 = null, l2 = 0;
    null != a2 && (i2 = K(a2 = O(c2, a2, "additional_data")), l2 = a2.length, c2.push(i2)), _2 = O(c2, _2, "public_nonce");
    var u2, d2 = 0 | r._crypto_aead_aegis256_npubbytes();
    _2.length !== d2 && L(c2, "invalid public_nonce length"), u2 = K(_2), c2.push(u2), n2 = O(c2, n2, "key");
    var v2, g2 = 0 | r._crypto_aead_aegis256_keybytes();
    n2.length !== g2 && L(c2, "invalid key length"), v2 = K(n2), c2.push(v2);
    var b2 = new B(y2 - r._crypto_aead_aegis256_abytes() | 0), f2 = b2.address;
    if (c2.push(f2), 0 === r._crypto_aead_aegis256_decrypt(f2, null, p2, o2, y2, 0, i2, l2, 0, u2, v2)) {
      var m2 = S(b2, s2);
      return M(c2), m2;
    }
    N(c2, "ciphertext cannot be decrypted using that key");
  }
  function F(e, t2, a2, _2, n2, s2, c2) {
    var p2 = [];
    Y(c2);
    var o2 = null;
    null != e && (o2 = K(e = O(p2, e, "secret_nonce")), e.length, p2.push(o2));
    var h2 = K(t2 = O(p2, t2, "ciphertext")), y2 = t2.length;
    p2.push(h2), a2 = O(p2, a2, "mac");
    var i2, l2 = 0 | r._crypto_aead_aegis256_abytes();
    a2.length !== l2 && L(p2, "invalid mac length"), i2 = K(a2), p2.push(i2);
    var u2 = null, d2 = 0;
    null != _2 && (u2 = K(_2 = O(p2, _2, "additional_data")), d2 = _2.length, p2.push(u2)), n2 = O(p2, n2, "public_nonce");
    var v2, g2 = 0 | r._crypto_aead_aegis256_npubbytes();
    n2.length !== g2 && L(p2, "invalid public_nonce length"), v2 = K(n2), p2.push(v2), s2 = O(p2, s2, "key");
    var b2, f2 = 0 | r._crypto_aead_aegis256_keybytes();
    s2.length !== f2 && L(p2, "invalid key length"), b2 = K(s2), p2.push(b2);
    var m2 = new B(0 | y2), k2 = m2.address;
    if (p2.push(k2), 0 === r._crypto_aead_aegis256_decrypt_detached(k2, o2, h2, y2, 0, i2, u2, d2, 0, v2, b2)) {
      var x2 = S(m2, c2);
      return M(p2), x2;
    }
    N(p2, "ciphertext cannot be decrypted using that key");
  }
  function V(e, t2, a2, _2, n2, s2) {
    var c2 = [];
    Y(s2);
    var p2 = K(e = O(c2, e, "message")), o2 = e.length;
    c2.push(p2);
    var h2 = null, y2 = 0;
    null != t2 && (h2 = K(t2 = O(c2, t2, "additional_data")), y2 = t2.length, c2.push(h2));
    var i2 = null;
    null != a2 && (i2 = K(a2 = O(c2, a2, "secret_nonce")), a2.length, c2.push(i2)), _2 = O(c2, _2, "public_nonce");
    var l2, u2 = 0 | r._crypto_aead_aegis256_npubbytes();
    _2.length !== u2 && L(c2, "invalid public_nonce length"), l2 = K(_2), c2.push(l2), n2 = O(c2, n2, "key");
    var d2, v2 = 0 | r._crypto_aead_aegis256_keybytes();
    n2.length !== v2 && L(c2, "invalid key length"), d2 = K(n2), c2.push(d2);
    var g2 = new B(o2 + r._crypto_aead_aegis256_abytes() | 0), b2 = g2.address;
    if (c2.push(b2), 0 === r._crypto_aead_aegis256_encrypt(b2, null, p2, o2, 0, h2, y2, 0, i2, l2, d2)) {
      var f2 = S(g2, s2);
      return M(c2), f2;
    }
    N(c2, "invalid usage");
  }
  function q(e, t2, a2, _2, n2, s2) {
    var c2 = [];
    Y(s2);
    var p2 = K(e = O(c2, e, "message")), o2 = e.length;
    c2.push(p2);
    var h2 = null, y2 = 0;
    null != t2 && (h2 = K(t2 = O(c2, t2, "additional_data")), y2 = t2.length, c2.push(h2));
    var i2 = null;
    null != a2 && (i2 = K(a2 = O(c2, a2, "secret_nonce")), a2.length, c2.push(i2)), _2 = O(c2, _2, "public_nonce");
    var l2, u2 = 0 | r._crypto_aead_aegis256_npubbytes();
    _2.length !== u2 && L(c2, "invalid public_nonce length"), l2 = K(_2), c2.push(l2), n2 = O(c2, n2, "key");
    var d2, v2 = 0 | r._crypto_aead_aegis256_keybytes();
    n2.length !== v2 && L(c2, "invalid key length"), d2 = K(n2), c2.push(d2);
    var g2 = new B(0 | o2), b2 = g2.address;
    c2.push(b2);
    var f2 = new B(0 | r._crypto_aead_aegis256_abytes()), m2 = f2.address;
    if (c2.push(m2), 0 === r._crypto_aead_aegis256_encrypt_detached(b2, m2, null, p2, o2, 0, h2, y2, 0, i2, l2, d2)) {
      var k2 = S({ ciphertext: g2, mac: f2 }, s2);
      return M(c2), k2;
    }
    N(c2, "invalid usage");
  }
  function H(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_aead_aegis256_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_aead_aegis256_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function z(e, t2, a2, _2, n2, s2) {
    var c2 = [];
    Y(s2);
    var p2 = null;
    null != e && (p2 = K(e = O(c2, e, "secret_nonce")), e.length, c2.push(p2)), t2 = O(c2, t2, "ciphertext");
    var o2, h2 = r._crypto_aead_chacha20poly1305_abytes(), y2 = t2.length;
    y2 < h2 && L(c2, "ciphertext is too short"), o2 = K(t2), c2.push(o2);
    var i2 = null, l2 = 0;
    null != a2 && (i2 = K(a2 = O(c2, a2, "additional_data")), l2 = a2.length, c2.push(i2)), _2 = O(c2, _2, "public_nonce");
    var u2, d2 = 0 | r._crypto_aead_chacha20poly1305_npubbytes();
    _2.length !== d2 && L(c2, "invalid public_nonce length"), u2 = K(_2), c2.push(u2), n2 = O(c2, n2, "key");
    var v2, g2 = 0 | r._crypto_aead_chacha20poly1305_keybytes();
    n2.length !== g2 && L(c2, "invalid key length"), v2 = K(n2), c2.push(v2);
    var b2 = new B(y2 - r._crypto_aead_chacha20poly1305_abytes() | 0), f2 = b2.address;
    if (c2.push(f2), 0 === r._crypto_aead_chacha20poly1305_decrypt(f2, null, p2, o2, y2, 0, i2, l2, 0, u2, v2)) {
      var m2 = S(b2, s2);
      return M(c2), m2;
    }
    N(c2, "ciphertext cannot be decrypted using that key");
  }
  function W(e, t2, a2, _2, n2, s2, c2) {
    var p2 = [];
    Y(c2);
    var o2 = null;
    null != e && (o2 = K(e = O(p2, e, "secret_nonce")), e.length, p2.push(o2));
    var h2 = K(t2 = O(p2, t2, "ciphertext")), y2 = t2.length;
    p2.push(h2), a2 = O(p2, a2, "mac");
    var i2, l2 = 0 | r._crypto_box_macbytes();
    a2.length !== l2 && L(p2, "invalid mac length"), i2 = K(a2), p2.push(i2);
    var u2 = null, d2 = 0;
    null != _2 && (u2 = K(_2 = O(p2, _2, "additional_data")), d2 = _2.length, p2.push(u2)), n2 = O(p2, n2, "public_nonce");
    var v2, g2 = 0 | r._crypto_aead_chacha20poly1305_npubbytes();
    n2.length !== g2 && L(p2, "invalid public_nonce length"), v2 = K(n2), p2.push(v2), s2 = O(p2, s2, "key");
    var b2, f2 = 0 | r._crypto_aead_chacha20poly1305_keybytes();
    s2.length !== f2 && L(p2, "invalid key length"), b2 = K(s2), p2.push(b2);
    var m2 = new B(0 | y2), k2 = m2.address;
    if (p2.push(k2), 0 === r._crypto_aead_chacha20poly1305_decrypt_detached(k2, o2, h2, y2, 0, i2, u2, d2, 0, v2, b2)) {
      var x2 = S(m2, c2);
      return M(p2), x2;
    }
    N(p2, "ciphertext cannot be decrypted using that key");
  }
  function j(e, t2, a2, _2, n2, s2) {
    var c2 = [];
    Y(s2);
    var p2 = K(e = O(c2, e, "message")), o2 = e.length;
    c2.push(p2);
    var h2 = null, y2 = 0;
    null != t2 && (h2 = K(t2 = O(c2, t2, "additional_data")), y2 = t2.length, c2.push(h2));
    var i2 = null;
    null != a2 && (i2 = K(a2 = O(c2, a2, "secret_nonce")), a2.length, c2.push(i2)), _2 = O(c2, _2, "public_nonce");
    var l2, u2 = 0 | r._crypto_aead_chacha20poly1305_npubbytes();
    _2.length !== u2 && L(c2, "invalid public_nonce length"), l2 = K(_2), c2.push(l2), n2 = O(c2, n2, "key");
    var d2, v2 = 0 | r._crypto_aead_chacha20poly1305_keybytes();
    n2.length !== v2 && L(c2, "invalid key length"), d2 = K(n2), c2.push(d2);
    var g2 = new B(o2 + r._crypto_aead_chacha20poly1305_abytes() | 0), b2 = g2.address;
    if (c2.push(b2), 0 === r._crypto_aead_chacha20poly1305_encrypt(b2, null, p2, o2, 0, h2, y2, 0, i2, l2, d2)) {
      var f2 = S(g2, s2);
      return M(c2), f2;
    }
    N(c2, "invalid usage");
  }
  function J(e, t2, a2, _2, n2, s2) {
    var c2 = [];
    Y(s2);
    var p2 = K(e = O(c2, e, "message")), o2 = e.length;
    c2.push(p2);
    var h2 = null, y2 = 0;
    null != t2 && (h2 = K(t2 = O(c2, t2, "additional_data")), y2 = t2.length, c2.push(h2));
    var i2 = null;
    null != a2 && (i2 = K(a2 = O(c2, a2, "secret_nonce")), a2.length, c2.push(i2)), _2 = O(c2, _2, "public_nonce");
    var l2, u2 = 0 | r._crypto_aead_chacha20poly1305_npubbytes();
    _2.length !== u2 && L(c2, "invalid public_nonce length"), l2 = K(_2), c2.push(l2), n2 = O(c2, n2, "key");
    var d2, v2 = 0 | r._crypto_aead_chacha20poly1305_keybytes();
    n2.length !== v2 && L(c2, "invalid key length"), d2 = K(n2), c2.push(d2);
    var g2 = new B(0 | o2), b2 = g2.address;
    c2.push(b2);
    var f2 = new B(0 | r._crypto_aead_chacha20poly1305_abytes()), m2 = f2.address;
    if (c2.push(m2), 0 === r._crypto_aead_chacha20poly1305_encrypt_detached(b2, m2, null, p2, o2, 0, h2, y2, 0, i2, l2, d2)) {
      var k2 = S({ ciphertext: g2, mac: f2 }, s2);
      return M(c2), k2;
    }
    N(c2, "invalid usage");
  }
  function Q(e, t2, a2, _2, n2, s2) {
    var c2 = [];
    Y(s2);
    var p2 = null;
    null != e && (p2 = K(e = O(c2, e, "secret_nonce")), e.length, c2.push(p2)), t2 = O(c2, t2, "ciphertext");
    var o2, h2 = r._crypto_aead_chacha20poly1305_ietf_abytes(), y2 = t2.length;
    y2 < h2 && L(c2, "ciphertext is too short"), o2 = K(t2), c2.push(o2);
    var i2 = null, l2 = 0;
    null != a2 && (i2 = K(a2 = O(c2, a2, "additional_data")), l2 = a2.length, c2.push(i2)), _2 = O(c2, _2, "public_nonce");
    var u2, d2 = 0 | r._crypto_aead_chacha20poly1305_ietf_npubbytes();
    _2.length !== d2 && L(c2, "invalid public_nonce length"), u2 = K(_2), c2.push(u2), n2 = O(c2, n2, "key");
    var v2, g2 = 0 | r._crypto_aead_chacha20poly1305_ietf_keybytes();
    n2.length !== g2 && L(c2, "invalid key length"), v2 = K(n2), c2.push(v2);
    var b2 = new B(y2 - r._crypto_aead_chacha20poly1305_ietf_abytes() | 0), f2 = b2.address;
    if (c2.push(f2), 0 === r._crypto_aead_chacha20poly1305_ietf_decrypt(f2, null, p2, o2, y2, 0, i2, l2, 0, u2, v2)) {
      var m2 = S(b2, s2);
      return M(c2), m2;
    }
    N(c2, "ciphertext cannot be decrypted using that key");
  }
  function Z(e, t2, a2, _2, n2, s2, c2) {
    var p2 = [];
    Y(c2);
    var o2 = null;
    null != e && (o2 = K(e = O(p2, e, "secret_nonce")), e.length, p2.push(o2));
    var h2 = K(t2 = O(p2, t2, "ciphertext")), y2 = t2.length;
    p2.push(h2), a2 = O(p2, a2, "mac");
    var i2, l2 = 0 | r._crypto_box_macbytes();
    a2.length !== l2 && L(p2, "invalid mac length"), i2 = K(a2), p2.push(i2);
    var u2 = null, d2 = 0;
    null != _2 && (u2 = K(_2 = O(p2, _2, "additional_data")), d2 = _2.length, p2.push(u2)), n2 = O(p2, n2, "public_nonce");
    var v2, g2 = 0 | r._crypto_aead_chacha20poly1305_ietf_npubbytes();
    n2.length !== g2 && L(p2, "invalid public_nonce length"), v2 = K(n2), p2.push(v2), s2 = O(p2, s2, "key");
    var b2, f2 = 0 | r._crypto_aead_chacha20poly1305_ietf_keybytes();
    s2.length !== f2 && L(p2, "invalid key length"), b2 = K(s2), p2.push(b2);
    var m2 = new B(0 | y2), k2 = m2.address;
    if (p2.push(k2), 0 === r._crypto_aead_chacha20poly1305_ietf_decrypt_detached(k2, o2, h2, y2, 0, i2, u2, d2, 0, v2, b2)) {
      var x2 = S(m2, c2);
      return M(p2), x2;
    }
    N(p2, "ciphertext cannot be decrypted using that key");
  }
  function $(e, t2, a2, _2, n2, s2) {
    var c2 = [];
    Y(s2);
    var p2 = K(e = O(c2, e, "message")), o2 = e.length;
    c2.push(p2);
    var h2 = null, y2 = 0;
    null != t2 && (h2 = K(t2 = O(c2, t2, "additional_data")), y2 = t2.length, c2.push(h2));
    var i2 = null;
    null != a2 && (i2 = K(a2 = O(c2, a2, "secret_nonce")), a2.length, c2.push(i2)), _2 = O(c2, _2, "public_nonce");
    var l2, u2 = 0 | r._crypto_aead_chacha20poly1305_ietf_npubbytes();
    _2.length !== u2 && L(c2, "invalid public_nonce length"), l2 = K(_2), c2.push(l2), n2 = O(c2, n2, "key");
    var d2, v2 = 0 | r._crypto_aead_chacha20poly1305_ietf_keybytes();
    n2.length !== v2 && L(c2, "invalid key length"), d2 = K(n2), c2.push(d2);
    var g2 = new B(o2 + r._crypto_aead_chacha20poly1305_ietf_abytes() | 0), b2 = g2.address;
    if (c2.push(b2), 0 === r._crypto_aead_chacha20poly1305_ietf_encrypt(b2, null, p2, o2, 0, h2, y2, 0, i2, l2, d2)) {
      var f2 = S(g2, s2);
      return M(c2), f2;
    }
    N(c2, "invalid usage");
  }
  function ee(e, t2, a2, _2, n2, s2) {
    var c2 = [];
    Y(s2);
    var p2 = K(e = O(c2, e, "message")), o2 = e.length;
    c2.push(p2);
    var h2 = null, y2 = 0;
    null != t2 && (h2 = K(t2 = O(c2, t2, "additional_data")), y2 = t2.length, c2.push(h2));
    var i2 = null;
    null != a2 && (i2 = K(a2 = O(c2, a2, "secret_nonce")), a2.length, c2.push(i2)), _2 = O(c2, _2, "public_nonce");
    var l2, u2 = 0 | r._crypto_aead_chacha20poly1305_ietf_npubbytes();
    _2.length !== u2 && L(c2, "invalid public_nonce length"), l2 = K(_2), c2.push(l2), n2 = O(c2, n2, "key");
    var d2, v2 = 0 | r._crypto_aead_chacha20poly1305_ietf_keybytes();
    n2.length !== v2 && L(c2, "invalid key length"), d2 = K(n2), c2.push(d2);
    var g2 = new B(0 | o2), b2 = g2.address;
    c2.push(b2);
    var f2 = new B(0 | r._crypto_aead_chacha20poly1305_ietf_abytes()), m2 = f2.address;
    if (c2.push(m2), 0 === r._crypto_aead_chacha20poly1305_ietf_encrypt_detached(b2, m2, null, p2, o2, 0, h2, y2, 0, i2, l2, d2)) {
      var k2 = S({ ciphertext: g2, mac: f2 }, s2);
      return M(c2), k2;
    }
    N(c2, "invalid usage");
  }
  function re(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_aead_chacha20poly1305_ietf_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_aead_chacha20poly1305_ietf_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function te(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_aead_chacha20poly1305_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_aead_chacha20poly1305_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function ae(e, t2, a2, _2, n2, s2) {
    var c2 = [];
    Y(s2);
    var p2 = null;
    null != e && (p2 = K(e = O(c2, e, "secret_nonce")), e.length, c2.push(p2)), t2 = O(c2, t2, "ciphertext");
    var o2, h2 = r._crypto_aead_xchacha20poly1305_ietf_abytes(), y2 = t2.length;
    y2 < h2 && L(c2, "ciphertext is too short"), o2 = K(t2), c2.push(o2);
    var i2 = null, l2 = 0;
    null != a2 && (i2 = K(a2 = O(c2, a2, "additional_data")), l2 = a2.length, c2.push(i2)), _2 = O(c2, _2, "public_nonce");
    var u2, d2 = 0 | r._crypto_aead_xchacha20poly1305_ietf_npubbytes();
    _2.length !== d2 && L(c2, "invalid public_nonce length"), u2 = K(_2), c2.push(u2), n2 = O(c2, n2, "key");
    var v2, g2 = 0 | r._crypto_aead_xchacha20poly1305_ietf_keybytes();
    n2.length !== g2 && L(c2, "invalid key length"), v2 = K(n2), c2.push(v2);
    var b2 = new B(y2 - r._crypto_aead_xchacha20poly1305_ietf_abytes() | 0), f2 = b2.address;
    if (c2.push(f2), 0 === r._crypto_aead_xchacha20poly1305_ietf_decrypt(f2, null, p2, o2, y2, 0, i2, l2, 0, u2, v2)) {
      var m2 = S(b2, s2);
      return M(c2), m2;
    }
    N(c2, "ciphertext cannot be decrypted using that key");
  }
  function _e(e, t2, a2, _2, n2, s2, c2) {
    var p2 = [];
    Y(c2);
    var o2 = null;
    null != e && (o2 = K(e = O(p2, e, "secret_nonce")), e.length, p2.push(o2));
    var h2 = K(t2 = O(p2, t2, "ciphertext")), y2 = t2.length;
    p2.push(h2), a2 = O(p2, a2, "mac");
    var i2, l2 = 0 | r._crypto_box_macbytes();
    a2.length !== l2 && L(p2, "invalid mac length"), i2 = K(a2), p2.push(i2);
    var u2 = null, d2 = 0;
    null != _2 && (u2 = K(_2 = O(p2, _2, "additional_data")), d2 = _2.length, p2.push(u2)), n2 = O(p2, n2, "public_nonce");
    var v2, g2 = 0 | r._crypto_aead_xchacha20poly1305_ietf_npubbytes();
    n2.length !== g2 && L(p2, "invalid public_nonce length"), v2 = K(n2), p2.push(v2), s2 = O(p2, s2, "key");
    var b2, f2 = 0 | r._crypto_aead_xchacha20poly1305_ietf_keybytes();
    s2.length !== f2 && L(p2, "invalid key length"), b2 = K(s2), p2.push(b2);
    var m2 = new B(0 | y2), k2 = m2.address;
    if (p2.push(k2), 0 === r._crypto_aead_xchacha20poly1305_ietf_decrypt_detached(k2, o2, h2, y2, 0, i2, u2, d2, 0, v2, b2)) {
      var x2 = S(m2, c2);
      return M(p2), x2;
    }
    N(p2, "ciphertext cannot be decrypted using that key");
  }
  function ne(e, t2, a2, _2, n2, s2) {
    var c2 = [];
    Y(s2);
    var p2 = K(e = O(c2, e, "message")), o2 = e.length;
    c2.push(p2);
    var h2 = null, y2 = 0;
    null != t2 && (h2 = K(t2 = O(c2, t2, "additional_data")), y2 = t2.length, c2.push(h2));
    var i2 = null;
    null != a2 && (i2 = K(a2 = O(c2, a2, "secret_nonce")), a2.length, c2.push(i2)), _2 = O(c2, _2, "public_nonce");
    var l2, u2 = 0 | r._crypto_aead_xchacha20poly1305_ietf_npubbytes();
    _2.length !== u2 && L(c2, "invalid public_nonce length"), l2 = K(_2), c2.push(l2), n2 = O(c2, n2, "key");
    var d2, v2 = 0 | r._crypto_aead_xchacha20poly1305_ietf_keybytes();
    n2.length !== v2 && L(c2, "invalid key length"), d2 = K(n2), c2.push(d2);
    var g2 = new B(o2 + r._crypto_aead_xchacha20poly1305_ietf_abytes() | 0), b2 = g2.address;
    if (c2.push(b2), 0 === r._crypto_aead_xchacha20poly1305_ietf_encrypt(b2, null, p2, o2, 0, h2, y2, 0, i2, l2, d2)) {
      var f2 = S(g2, s2);
      return M(c2), f2;
    }
    N(c2, "invalid usage");
  }
  function se(e, t2, a2, _2, n2, s2) {
    var c2 = [];
    Y(s2);
    var p2 = K(e = O(c2, e, "message")), o2 = e.length;
    c2.push(p2);
    var h2 = null, y2 = 0;
    null != t2 && (h2 = K(t2 = O(c2, t2, "additional_data")), y2 = t2.length, c2.push(h2));
    var i2 = null;
    null != a2 && (i2 = K(a2 = O(c2, a2, "secret_nonce")), a2.length, c2.push(i2)), _2 = O(c2, _2, "public_nonce");
    var l2, u2 = 0 | r._crypto_aead_xchacha20poly1305_ietf_npubbytes();
    _2.length !== u2 && L(c2, "invalid public_nonce length"), l2 = K(_2), c2.push(l2), n2 = O(c2, n2, "key");
    var d2, v2 = 0 | r._crypto_aead_xchacha20poly1305_ietf_keybytes();
    n2.length !== v2 && L(c2, "invalid key length"), d2 = K(n2), c2.push(d2);
    var g2 = new B(0 | o2), b2 = g2.address;
    c2.push(b2);
    var f2 = new B(0 | r._crypto_aead_xchacha20poly1305_ietf_abytes()), m2 = f2.address;
    if (c2.push(m2), 0 === r._crypto_aead_xchacha20poly1305_ietf_encrypt_detached(b2, m2, null, p2, o2, 0, h2, y2, 0, i2, l2, d2)) {
      var k2 = S({ ciphertext: g2, mac: f2 }, s2);
      return M(c2), k2;
    }
    N(c2, "invalid usage");
  }
  function ce(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_aead_xchacha20poly1305_ietf_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_aead_xchacha20poly1305_ietf_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function pe(e, t2, a2) {
    var _2 = [];
    Y(a2);
    var n2 = K(e = O(_2, e, "message")), s2 = e.length;
    _2.push(n2), t2 = O(_2, t2, "key");
    var c2, p2 = 0 | r._crypto_auth_keybytes();
    t2.length !== p2 && L(_2, "invalid key length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_auth_bytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_auth(h2, n2, s2, 0, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "invalid usage");
  }
  function oe(e, t2, a2) {
    var _2 = [];
    Y(a2);
    var n2 = K(e = O(_2, e, "message")), s2 = e.length;
    _2.push(n2), t2 = O(_2, t2, "key");
    var c2, p2 = 0 | r._crypto_auth_hmacsha256_keybytes();
    t2.length !== p2 && L(_2, "invalid key length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_auth_hmacsha256_bytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_auth_hmacsha256(h2, n2, s2, 0, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "invalid usage");
  }
  function he(e, t2) {
    var a2 = [];
    Y(t2), U(a2, e, "state_address");
    var _2 = new B(0 | r._crypto_auth_hmacsha256_bytes()), n2 = _2.address;
    if (a2.push(n2), !(0 | r._crypto_auth_hmacsha256_final(e, n2))) {
      var s2 = (r._free(e), S(_2, t2));
      return M(a2), s2;
    }
    N(a2, "invalid usage");
  }
  function ye(e, t2) {
    var a2 = [];
    Y(t2);
    var _2 = null, n2 = 0;
    null != e && (_2 = K(e = O(a2, e, "key")), n2 = e.length, a2.push(_2));
    var s2 = new B(208).address;
    if (!(0 | r._crypto_auth_hmacsha256_init(s2, _2, n2))) {
      var c2 = s2;
      return M(a2), c2;
    }
    N(a2, "invalid usage");
  }
  function ie(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_auth_hmacsha256_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_auth_hmacsha256_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function le(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "state_address");
    var n2 = K(t2 = O(_2, t2, "message_chunk")), s2 = t2.length;
    _2.push(n2), 0 | r._crypto_auth_hmacsha256_update(e, n2, s2) && N(_2, "invalid usage"), M(_2);
  }
  function ue(e, t2, a2) {
    var _2 = [];
    e = O(_2, e, "tag");
    var n2, s2 = 0 | r._crypto_auth_hmacsha256_bytes();
    e.length !== s2 && L(_2, "invalid tag length"), n2 = K(e), _2.push(n2);
    var c2 = K(t2 = O(_2, t2, "message")), p2 = t2.length;
    _2.push(c2), a2 = O(_2, a2, "key");
    var o2, h2 = 0 | r._crypto_auth_hmacsha256_keybytes();
    a2.length !== h2 && L(_2, "invalid key length"), o2 = K(a2), _2.push(o2);
    var y2 = !(0 | r._crypto_auth_hmacsha256_verify(n2, c2, p2, 0, o2));
    return M(_2), y2;
  }
  function de(e, t2, a2) {
    var _2 = [];
    Y(a2);
    var n2 = K(e = O(_2, e, "message")), s2 = e.length;
    _2.push(n2), t2 = O(_2, t2, "key");
    var c2, p2 = 0 | r._crypto_auth_hmacsha512_keybytes();
    t2.length !== p2 && L(_2, "invalid key length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_auth_hmacsha512_bytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_auth_hmacsha512(h2, n2, s2, 0, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "invalid usage");
  }
  function ve(e, t2, a2) {
    var _2 = [];
    Y(a2);
    var n2 = K(e = O(_2, e, "message")), s2 = e.length;
    _2.push(n2), t2 = O(_2, t2, "key");
    var c2, p2 = 0 | r._crypto_auth_hmacsha512256_keybytes();
    t2.length !== p2 && L(_2, "invalid key length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_auth_hmacsha512256_bytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_auth_hmacsha512256(h2, n2, s2, 0, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "invalid usage");
  }
  function ge(e, t2) {
    var a2 = [];
    Y(t2), U(a2, e, "state_address");
    var _2 = new B(0 | r._crypto_auth_hmacsha512256_bytes()), n2 = _2.address;
    if (a2.push(n2), !(0 | r._crypto_auth_hmacsha512256_final(e, n2))) {
      var s2 = (r._free(e), S(_2, t2));
      return M(a2), s2;
    }
    N(a2, "invalid usage");
  }
  function be(e, t2) {
    var a2 = [];
    Y(t2);
    var _2 = null, n2 = 0;
    null != e && (_2 = K(e = O(a2, e, "key")), n2 = e.length, a2.push(_2));
    var s2 = new B(416).address;
    if (!(0 | r._crypto_auth_hmacsha512256_init(s2, _2, n2))) {
      var c2 = s2;
      return M(a2), c2;
    }
    N(a2, "invalid usage");
  }
  function fe(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_auth_hmacsha512256_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_auth_hmacsha512256_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function me(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "state_address");
    var n2 = K(t2 = O(_2, t2, "message_chunk")), s2 = t2.length;
    _2.push(n2), 0 | r._crypto_auth_hmacsha512256_update(e, n2, s2) && N(_2, "invalid usage"), M(_2);
  }
  function ke(e, t2, a2) {
    var _2 = [];
    e = O(_2, e, "tag");
    var n2, s2 = 0 | r._crypto_auth_hmacsha512256_bytes();
    e.length !== s2 && L(_2, "invalid tag length"), n2 = K(e), _2.push(n2);
    var c2 = K(t2 = O(_2, t2, "message")), p2 = t2.length;
    _2.push(c2), a2 = O(_2, a2, "key");
    var o2, h2 = 0 | r._crypto_auth_hmacsha512256_keybytes();
    a2.length !== h2 && L(_2, "invalid key length"), o2 = K(a2), _2.push(o2);
    var y2 = !(0 | r._crypto_auth_hmacsha512256_verify(n2, c2, p2, 0, o2));
    return M(_2), y2;
  }
  function xe(e, t2) {
    var a2 = [];
    Y(t2), U(a2, e, "state_address");
    var _2 = new B(0 | r._crypto_auth_hmacsha512_bytes()), n2 = _2.address;
    if (a2.push(n2), !(0 | r._crypto_auth_hmacsha512_final(e, n2))) {
      var s2 = (r._free(e), S(_2, t2));
      return M(a2), s2;
    }
    N(a2, "invalid usage");
  }
  function Ee(e, t2) {
    var a2 = [];
    Y(t2);
    var _2 = null, n2 = 0;
    null != e && (_2 = K(e = O(a2, e, "key")), n2 = e.length, a2.push(_2));
    var s2 = new B(416).address;
    if (!(0 | r._crypto_auth_hmacsha512_init(s2, _2, n2))) {
      var c2 = s2;
      return M(a2), c2;
    }
    N(a2, "invalid usage");
  }
  function Te(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_auth_hmacsha512_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_auth_hmacsha512_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function Se(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "state_address");
    var n2 = K(t2 = O(_2, t2, "message_chunk")), s2 = t2.length;
    _2.push(n2), 0 | r._crypto_auth_hmacsha512_update(e, n2, s2) && N(_2, "invalid usage"), M(_2);
  }
  function we(e, t2, a2) {
    var _2 = [];
    e = O(_2, e, "tag");
    var n2, s2 = 0 | r._crypto_auth_hmacsha512_bytes();
    e.length !== s2 && L(_2, "invalid tag length"), n2 = K(e), _2.push(n2);
    var c2 = K(t2 = O(_2, t2, "message")), p2 = t2.length;
    _2.push(c2), a2 = O(_2, a2, "key");
    var o2, h2 = 0 | r._crypto_auth_hmacsha512_keybytes();
    a2.length !== h2 && L(_2, "invalid key length"), o2 = K(a2), _2.push(o2);
    var y2 = !(0 | r._crypto_auth_hmacsha512_verify(n2, c2, p2, 0, o2));
    return M(_2), y2;
  }
  function Ye(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_auth_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_auth_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function Be(e, t2, a2) {
    var _2 = [];
    e = O(_2, e, "tag");
    var n2, s2 = 0 | r._crypto_auth_bytes();
    e.length !== s2 && L(_2, "invalid tag length"), n2 = K(e), _2.push(n2);
    var c2 = K(t2 = O(_2, t2, "message")), p2 = t2.length;
    _2.push(c2), a2 = O(_2, a2, "key");
    var o2, h2 = 0 | r._crypto_auth_keybytes();
    a2.length !== h2 && L(_2, "invalid key length"), o2 = K(a2), _2.push(o2);
    var y2 = !(0 | r._crypto_auth_verify(n2, c2, p2, 0, o2));
    return M(_2), y2;
  }
  function Ke(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "publicKey");
    var n2, s2 = 0 | r._crypto_box_publickeybytes();
    e.length !== s2 && L(_2, "invalid publicKey length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "privateKey");
    var c2, p2 = 0 | r._crypto_box_secretkeybytes();
    t2.length !== p2 && L(_2, "invalid privateKey length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_box_beforenmbytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_box_beforenm(h2, n2, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "invalid usage");
  }
  function Ae(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "publicKey");
    var n2, s2 = 0 | r._crypto_box_curve25519xchacha20poly1305_publickeybytes();
    e.length !== s2 && L(_2, "invalid publicKey length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "privateKey");
    var c2, p2 = 0 | r._crypto_box_curve25519xchacha20poly1305_secretkeybytes();
    t2.length !== p2 && L(_2, "invalid privateKey length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_box_curve25519xchacha20poly1305_beforenmbytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_box_curve25519xchacha20poly1305_beforenm(h2, n2, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "invalid usage");
  }
  function Ie(e, t2, a2, _2, n2) {
    var s2 = [];
    Y(n2);
    var c2 = K(e = O(s2, e, "message")), p2 = e.length;
    s2.push(c2), t2 = O(s2, t2, "nonce");
    var o2, h2 = 0 | r._crypto_box_curve25519xchacha20poly1305_noncebytes();
    t2.length !== h2 && L(s2, "invalid nonce length"), o2 = K(t2), s2.push(o2), a2 = O(s2, a2, "publicKey");
    var y2, i2 = 0 | r._crypto_box_curve25519xchacha20poly1305_publickeybytes();
    a2.length !== i2 && L(s2, "invalid publicKey length"), y2 = K(a2), s2.push(y2), _2 = O(s2, _2, "privateKey");
    var l2, u2 = 0 | r._crypto_box_curve25519xchacha20poly1305_secretkeybytes();
    _2.length !== u2 && L(s2, "invalid privateKey length"), l2 = K(_2), s2.push(l2);
    var d2 = new B(0 | p2), v2 = d2.address;
    s2.push(v2);
    var g2 = new B(0 | r._crypto_box_curve25519xchacha20poly1305_macbytes()), b2 = g2.address;
    if (s2.push(b2), !(0 | r._crypto_box_curve25519xchacha20poly1305_detached(v2, b2, c2, p2, 0, o2, y2, l2))) {
      var f2 = S({ ciphertext: d2, mac: g2 }, n2);
      return M(s2), f2;
    }
    N(s2, "invalid usage");
  }
  function Me(e, t2, a2, _2) {
    var n2 = [];
    Y(_2);
    var s2 = K(e = O(n2, e, "message")), c2 = e.length;
    n2.push(s2), t2 = O(n2, t2, "nonce");
    var p2, o2 = 0 | r._crypto_box_curve25519xchacha20poly1305_noncebytes();
    t2.length !== o2 && L(n2, "invalid nonce length"), p2 = K(t2), n2.push(p2), a2 = O(n2, a2, "sharedKey");
    var h2, y2 = 0 | r._crypto_box_curve25519xchacha20poly1305_beforenmbytes();
    a2.length !== y2 && L(n2, "invalid sharedKey length"), h2 = K(a2), n2.push(h2);
    var i2 = new B(0 | c2), l2 = i2.address;
    n2.push(l2);
    var u2 = new B(0 | r._crypto_box_curve25519xchacha20poly1305_macbytes()), d2 = u2.address;
    if (n2.push(d2), !(0 | r._crypto_box_curve25519xchacha20poly1305_detached_afternm(l2, d2, s2, c2, 0, p2, h2))) {
      var v2 = S({ ciphertext: i2, mac: u2 }, _2);
      return M(n2), v2;
    }
    N(n2, "invalid usage");
  }
  function Ne(e, t2, a2, _2, n2) {
    var s2 = [];
    Y(n2);
    var c2 = K(e = O(s2, e, "message")), p2 = e.length;
    s2.push(c2), t2 = O(s2, t2, "nonce");
    var o2, h2 = 0 | r._crypto_box_curve25519xchacha20poly1305_noncebytes();
    t2.length !== h2 && L(s2, "invalid nonce length"), o2 = K(t2), s2.push(o2), a2 = O(s2, a2, "publicKey");
    var y2, i2 = 0 | r._crypto_box_curve25519xchacha20poly1305_publickeybytes();
    a2.length !== i2 && L(s2, "invalid publicKey length"), y2 = K(a2), s2.push(y2), _2 = O(s2, _2, "privateKey");
    var l2, u2 = 0 | r._crypto_box_curve25519xchacha20poly1305_secretkeybytes();
    _2.length !== u2 && L(s2, "invalid privateKey length"), l2 = K(_2), s2.push(l2);
    var d2 = new B(p2 + r._crypto_box_curve25519xchacha20poly1305_macbytes() | 0), v2 = d2.address;
    if (s2.push(v2), !(0 | r._crypto_box_curve25519xchacha20poly1305_easy(v2, c2, p2, 0, o2, y2, l2))) {
      var g2 = S(d2, n2);
      return M(s2), g2;
    }
    N(s2, "invalid usage");
  }
  function Le(e, t2, a2, _2) {
    var n2 = [];
    Y(_2);
    var s2 = K(e = O(n2, e, "message")), c2 = e.length;
    n2.push(s2), t2 = O(n2, t2, "nonce");
    var p2, o2 = 0 | r._crypto_box_curve25519xchacha20poly1305_noncebytes();
    t2.length !== o2 && L(n2, "invalid nonce length"), p2 = K(t2), n2.push(p2), a2 = O(n2, a2, "sharedKey");
    var h2, y2 = 0 | r._crypto_box_curve25519xchacha20poly1305_beforenmbytes();
    a2.length !== y2 && L(n2, "invalid sharedKey length"), h2 = K(a2), n2.push(h2);
    var i2 = new B(c2 + r._crypto_box_curve25519xchacha20poly1305_macbytes() | 0), l2 = i2.address;
    if (n2.push(l2), !(0 | r._crypto_box_curve25519xchacha20poly1305_easy_afternm(l2, s2, c2, 0, p2, h2))) {
      var u2 = S(i2, _2);
      return M(n2), u2;
    }
    N(n2, "invalid usage");
  }
  function Ue(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_box_curve25519xchacha20poly1305_publickeybytes()), _2 = a2.address;
    t2.push(_2);
    var n2 = new B(0 | r._crypto_box_curve25519xchacha20poly1305_secretkeybytes()), s2 = n2.address;
    t2.push(s2), r._crypto_box_curve25519xchacha20poly1305_keypair(_2, s2);
    var c2 = S({ publicKey: a2, privateKey: n2, keyType: "curve25519" }, e);
    return M(t2), c2;
  }
  function Oe(e, t2, a2, _2, n2, s2) {
    var c2 = [];
    Y(s2);
    var p2 = K(e = O(c2, e, "ciphertext")), o2 = e.length;
    c2.push(p2), t2 = O(c2, t2, "mac");
    var h2, y2 = 0 | r._crypto_box_curve25519xchacha20poly1305_macbytes();
    t2.length !== y2 && L(c2, "invalid mac length"), h2 = K(t2), c2.push(h2), a2 = O(c2, a2, "nonce");
    var i2, l2 = 0 | r._crypto_box_curve25519xchacha20poly1305_noncebytes();
    a2.length !== l2 && L(c2, "invalid nonce length"), i2 = K(a2), c2.push(i2), _2 = O(c2, _2, "publicKey");
    var u2, d2 = 0 | r._crypto_box_curve25519xchacha20poly1305_publickeybytes();
    _2.length !== d2 && L(c2, "invalid publicKey length"), u2 = K(_2), c2.push(u2), n2 = O(c2, n2, "privateKey");
    var v2, g2 = 0 | r._crypto_box_curve25519xchacha20poly1305_secretkeybytes();
    n2.length !== g2 && L(c2, "invalid privateKey length"), v2 = K(n2), c2.push(v2);
    var b2 = new B(0 | o2), f2 = b2.address;
    if (c2.push(f2), !(0 | r._crypto_box_curve25519xchacha20poly1305_open_detached(f2, p2, h2, o2, 0, i2, u2, v2))) {
      var m2 = S(b2, s2);
      return M(c2), m2;
    }
    N(c2, "incorrect key pair for the given ciphertext");
  }
  function Ce(e, t2, a2, _2, n2) {
    var s2 = [];
    Y(n2);
    var c2 = K(e = O(s2, e, "ciphertext")), p2 = e.length;
    s2.push(c2), t2 = O(s2, t2, "mac");
    var o2, h2 = 0 | r._crypto_box_curve25519xchacha20poly1305_macbytes();
    t2.length !== h2 && L(s2, "invalid mac length"), o2 = K(t2), s2.push(o2), a2 = O(s2, a2, "nonce");
    var y2, i2 = 0 | r._crypto_box_curve25519xchacha20poly1305_noncebytes();
    a2.length !== i2 && L(s2, "invalid nonce length"), y2 = K(a2), s2.push(y2), _2 = O(s2, _2, "sharedKey");
    var l2, u2 = 0 | r._crypto_box_curve25519xchacha20poly1305_beforenmbytes();
    _2.length !== u2 && L(s2, "invalid sharedKey length"), l2 = K(_2), s2.push(l2);
    var d2 = new B(0 | p2), v2 = d2.address;
    if (s2.push(v2), !(0 | r._crypto_box_curve25519xchacha20poly1305_open_detached_afternm(v2, c2, o2, p2, 0, y2, l2))) {
      var g2 = S(d2, n2);
      return M(s2), g2;
    }
    N(s2, "incorrect secret key for the given ciphertext");
  }
  function Re(e, t2, a2, _2, n2) {
    var s2 = [];
    Y(n2), e = O(s2, e, "ciphertext");
    var c2, p2 = r._crypto_box_curve25519xchacha20poly1305_macbytes(), o2 = e.length;
    o2 < p2 && L(s2, "ciphertext is too short"), c2 = K(e), s2.push(c2), t2 = O(s2, t2, "nonce");
    var h2, y2 = 0 | r._crypto_box_curve25519xchacha20poly1305_noncebytes();
    t2.length !== y2 && L(s2, "invalid nonce length"), h2 = K(t2), s2.push(h2), a2 = O(s2, a2, "publicKey");
    var i2, l2 = 0 | r._crypto_box_curve25519xchacha20poly1305_publickeybytes();
    a2.length !== l2 && L(s2, "invalid publicKey length"), i2 = K(a2), s2.push(i2), _2 = O(s2, _2, "privateKey");
    var u2, d2 = 0 | r._crypto_box_curve25519xchacha20poly1305_secretkeybytes();
    _2.length !== d2 && L(s2, "invalid privateKey length"), u2 = K(_2), s2.push(u2);
    var v2 = new B(o2 - r._crypto_box_curve25519xchacha20poly1305_macbytes() | 0), g2 = v2.address;
    if (s2.push(g2), !(0 | r._crypto_box_curve25519xchacha20poly1305_open_easy(g2, c2, o2, 0, h2, i2, u2))) {
      var b2 = S(v2, n2);
      return M(s2), b2;
    }
    N(s2, "incorrect key pair for the given ciphertext");
  }
  function Pe(e, t2, a2, _2) {
    var n2 = [];
    Y(_2);
    var s2 = K(e = O(n2, e, "ciphertext")), c2 = e.length;
    n2.push(s2), t2 = O(n2, t2, "nonce");
    var p2, o2 = 0 | r._crypto_box_curve25519xchacha20poly1305_noncebytes();
    t2.length !== o2 && L(n2, "invalid nonce length"), p2 = K(t2), n2.push(p2), a2 = O(n2, a2, "sharedKey");
    var h2, y2 = 0 | r._crypto_box_curve25519xchacha20poly1305_beforenmbytes();
    a2.length !== y2 && L(n2, "invalid sharedKey length"), h2 = K(a2), n2.push(h2);
    var i2 = new B(c2 - r._crypto_box_curve25519xchacha20poly1305_macbytes() | 0), l2 = i2.address;
    if (n2.push(l2), !(0 | r._crypto_box_curve25519xchacha20poly1305_open_easy_afternm(l2, s2, c2, 0, p2, h2))) {
      var u2 = S(i2, _2);
      return M(n2), u2;
    }
    N(n2, "incorrect secret key for the given ciphertext");
  }
  function Xe(e, t2, a2) {
    var _2 = [];
    Y(a2);
    var n2 = K(e = O(_2, e, "message")), s2 = e.length;
    _2.push(n2), t2 = O(_2, t2, "publicKey");
    var c2, p2 = 0 | r._crypto_box_curve25519xchacha20poly1305_publickeybytes();
    t2.length !== p2 && L(_2, "invalid publicKey length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(s2 + r._crypto_box_curve25519xchacha20poly1305_sealbytes() | 0), h2 = o2.address;
    _2.push(h2), r._crypto_box_curve25519xchacha20poly1305_seal(h2, n2, s2, 0, c2);
    var y2 = S(o2, a2);
    return M(_2), y2;
  }
  function De(e, t2, a2, _2) {
    var n2 = [];
    Y(_2), e = O(n2, e, "ciphertext");
    var s2, c2 = r._crypto_box_curve25519xchacha20poly1305_sealbytes(), p2 = e.length;
    p2 < c2 && L(n2, "ciphertext is too short"), s2 = K(e), n2.push(s2), t2 = O(n2, t2, "publicKey");
    var o2, h2 = 0 | r._crypto_box_curve25519xchacha20poly1305_publickeybytes();
    t2.length !== h2 && L(n2, "invalid publicKey length"), o2 = K(t2), n2.push(o2), a2 = O(n2, a2, "secretKey");
    var y2, i2 = 0 | r._crypto_box_curve25519xchacha20poly1305_secretkeybytes();
    a2.length !== i2 && L(n2, "invalid secretKey length"), y2 = K(a2), n2.push(y2);
    var l2 = new B(p2 - r._crypto_box_curve25519xchacha20poly1305_sealbytes() | 0), u2 = l2.address;
    n2.push(u2), r._crypto_box_curve25519xchacha20poly1305_seal_open(u2, s2, p2, 0, o2, y2);
    var d2 = S(l2, _2);
    return M(n2), d2;
  }
  function Ge(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "seed");
    var _2, n2 = 0 | r._crypto_box_curve25519xchacha20poly1305_seedbytes();
    e.length !== n2 && L(a2, "invalid seed length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_box_curve25519xchacha20poly1305_publickeybytes()), c2 = s2.address;
    a2.push(c2);
    var p2 = new B(0 | r._crypto_box_curve25519xchacha20poly1305_secretkeybytes()), o2 = p2.address;
    if (a2.push(o2), !(0 | r._crypto_box_curve25519xchacha20poly1305_seed_keypair(c2, o2, _2))) {
      var h2 = { publicKey: S(s2, t2), privateKey: S(p2, t2), keyType: "x25519" };
      return M(a2), h2;
    }
    N(a2, "invalid usage");
  }
  function Fe(e, t2, a2, _2, n2) {
    var s2 = [];
    Y(n2);
    var c2 = K(e = O(s2, e, "message")), p2 = e.length;
    s2.push(c2), t2 = O(s2, t2, "nonce");
    var o2, h2 = 0 | r._crypto_box_noncebytes();
    t2.length !== h2 && L(s2, "invalid nonce length"), o2 = K(t2), s2.push(o2), a2 = O(s2, a2, "publicKey");
    var y2, i2 = 0 | r._crypto_box_publickeybytes();
    a2.length !== i2 && L(s2, "invalid publicKey length"), y2 = K(a2), s2.push(y2), _2 = O(s2, _2, "privateKey");
    var l2, u2 = 0 | r._crypto_box_secretkeybytes();
    _2.length !== u2 && L(s2, "invalid privateKey length"), l2 = K(_2), s2.push(l2);
    var d2 = new B(0 | p2), v2 = d2.address;
    s2.push(v2);
    var g2 = new B(0 | r._crypto_box_macbytes()), b2 = g2.address;
    if (s2.push(b2), !(0 | r._crypto_box_detached(v2, b2, c2, p2, 0, o2, y2, l2))) {
      var f2 = S({ ciphertext: d2, mac: g2 }, n2);
      return M(s2), f2;
    }
    N(s2, "invalid usage");
  }
  function Ve(e, t2, a2, _2, n2) {
    var s2 = [];
    Y(n2);
    var c2 = K(e = O(s2, e, "message")), p2 = e.length;
    s2.push(c2), t2 = O(s2, t2, "nonce");
    var o2, h2 = 0 | r._crypto_box_noncebytes();
    t2.length !== h2 && L(s2, "invalid nonce length"), o2 = K(t2), s2.push(o2), a2 = O(s2, a2, "publicKey");
    var y2, i2 = 0 | r._crypto_box_publickeybytes();
    a2.length !== i2 && L(s2, "invalid publicKey length"), y2 = K(a2), s2.push(y2), _2 = O(s2, _2, "privateKey");
    var l2, u2 = 0 | r._crypto_box_secretkeybytes();
    _2.length !== u2 && L(s2, "invalid privateKey length"), l2 = K(_2), s2.push(l2);
    var d2 = new B(p2 + r._crypto_box_macbytes() | 0), v2 = d2.address;
    if (s2.push(v2), !(0 | r._crypto_box_easy(v2, c2, p2, 0, o2, y2, l2))) {
      var g2 = S(d2, n2);
      return M(s2), g2;
    }
    N(s2, "invalid usage");
  }
  function qe(e, t2, a2, _2) {
    var n2 = [];
    Y(_2);
    var s2 = K(e = O(n2, e, "message")), c2 = e.length;
    n2.push(s2), t2 = O(n2, t2, "nonce");
    var p2, o2 = 0 | r._crypto_box_noncebytes();
    t2.length !== o2 && L(n2, "invalid nonce length"), p2 = K(t2), n2.push(p2), a2 = O(n2, a2, "sharedKey");
    var h2, y2 = 0 | r._crypto_box_beforenmbytes();
    a2.length !== y2 && L(n2, "invalid sharedKey length"), h2 = K(a2), n2.push(h2);
    var i2 = new B(c2 + r._crypto_box_macbytes() | 0), l2 = i2.address;
    if (n2.push(l2), !(0 | r._crypto_box_easy_afternm(l2, s2, c2, 0, p2, h2))) {
      var u2 = S(i2, _2);
      return M(n2), u2;
    }
    N(n2, "invalid usage");
  }
  function He(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_box_publickeybytes()), _2 = a2.address;
    t2.push(_2);
    var n2 = new B(0 | r._crypto_box_secretkeybytes()), s2 = n2.address;
    if (t2.push(s2), !(0 | r._crypto_box_keypair(_2, s2))) {
      var c2 = { publicKey: S(a2, e), privateKey: S(n2, e), keyType: "x25519" };
      return M(t2), c2;
    }
    N(t2, "internal error");
  }
  function ze(e, t2, a2, _2, n2, s2) {
    var c2 = [];
    Y(s2);
    var p2 = K(e = O(c2, e, "ciphertext")), o2 = e.length;
    c2.push(p2), t2 = O(c2, t2, "mac");
    var h2, y2 = 0 | r._crypto_box_macbytes();
    t2.length !== y2 && L(c2, "invalid mac length"), h2 = K(t2), c2.push(h2), a2 = O(c2, a2, "nonce");
    var i2, l2 = 0 | r._crypto_box_noncebytes();
    a2.length !== l2 && L(c2, "invalid nonce length"), i2 = K(a2), c2.push(i2), _2 = O(c2, _2, "publicKey");
    var u2, d2 = 0 | r._crypto_box_publickeybytes();
    _2.length !== d2 && L(c2, "invalid publicKey length"), u2 = K(_2), c2.push(u2), n2 = O(c2, n2, "privateKey");
    var v2, g2 = 0 | r._crypto_box_secretkeybytes();
    n2.length !== g2 && L(c2, "invalid privateKey length"), v2 = K(n2), c2.push(v2);
    var b2 = new B(0 | o2), f2 = b2.address;
    if (c2.push(f2), !(0 | r._crypto_box_open_detached(f2, p2, h2, o2, 0, i2, u2, v2))) {
      var m2 = S(b2, s2);
      return M(c2), m2;
    }
    N(c2, "incorrect key pair for the given ciphertext");
  }
  function We(e, t2, a2, _2, n2) {
    var s2 = [];
    Y(n2), e = O(s2, e, "ciphertext");
    var c2, p2 = r._crypto_box_macbytes(), o2 = e.length;
    o2 < p2 && L(s2, "ciphertext is too short"), c2 = K(e), s2.push(c2), t2 = O(s2, t2, "nonce");
    var h2, y2 = 0 | r._crypto_box_noncebytes();
    t2.length !== y2 && L(s2, "invalid nonce length"), h2 = K(t2), s2.push(h2), a2 = O(s2, a2, "publicKey");
    var i2, l2 = 0 | r._crypto_box_publickeybytes();
    a2.length !== l2 && L(s2, "invalid publicKey length"), i2 = K(a2), s2.push(i2), _2 = O(s2, _2, "privateKey");
    var u2, d2 = 0 | r._crypto_box_secretkeybytes();
    _2.length !== d2 && L(s2, "invalid privateKey length"), u2 = K(_2), s2.push(u2);
    var v2 = new B(o2 - r._crypto_box_macbytes() | 0), g2 = v2.address;
    if (s2.push(g2), !(0 | r._crypto_box_open_easy(g2, c2, o2, 0, h2, i2, u2))) {
      var b2 = S(v2, n2);
      return M(s2), b2;
    }
    N(s2, "incorrect key pair for the given ciphertext");
  }
  function je(e, t2, a2, _2) {
    var n2 = [];
    Y(_2);
    var s2 = K(e = O(n2, e, "ciphertext")), c2 = e.length;
    n2.push(s2), t2 = O(n2, t2, "nonce");
    var p2, o2 = 0 | r._crypto_box_noncebytes();
    t2.length !== o2 && L(n2, "invalid nonce length"), p2 = K(t2), n2.push(p2), a2 = O(n2, a2, "sharedKey");
    var h2, y2 = 0 | r._crypto_box_beforenmbytes();
    a2.length !== y2 && L(n2, "invalid sharedKey length"), h2 = K(a2), n2.push(h2);
    var i2 = new B(c2 - r._crypto_box_macbytes() | 0), l2 = i2.address;
    if (n2.push(l2), !(0 | r._crypto_box_open_easy_afternm(l2, s2, c2, 0, p2, h2))) {
      var u2 = S(i2, _2);
      return M(n2), u2;
    }
    N(n2, "incorrect secret key for the given ciphertext");
  }
  function Je(e, t2, a2) {
    var _2 = [];
    Y(a2);
    var n2 = K(e = O(_2, e, "message")), s2 = e.length;
    _2.push(n2), t2 = O(_2, t2, "publicKey");
    var c2, p2 = 0 | r._crypto_box_publickeybytes();
    t2.length !== p2 && L(_2, "invalid publicKey length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(s2 + r._crypto_box_sealbytes() | 0), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_box_seal(h2, n2, s2, 0, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "invalid usage");
  }
  function Qe(e, t2, a2, _2) {
    var n2 = [];
    Y(_2), e = O(n2, e, "ciphertext");
    var s2, c2 = r._crypto_box_sealbytes(), p2 = e.length;
    p2 < c2 && L(n2, "ciphertext is too short"), s2 = K(e), n2.push(s2), t2 = O(n2, t2, "publicKey");
    var o2, h2 = 0 | r._crypto_box_publickeybytes();
    t2.length !== h2 && L(n2, "invalid publicKey length"), o2 = K(t2), n2.push(o2), a2 = O(n2, a2, "privateKey");
    var y2, i2 = 0 | r._crypto_box_secretkeybytes();
    a2.length !== i2 && L(n2, "invalid privateKey length"), y2 = K(a2), n2.push(y2);
    var l2 = new B(p2 - r._crypto_box_sealbytes() | 0), u2 = l2.address;
    if (n2.push(u2), !(0 | r._crypto_box_seal_open(u2, s2, p2, 0, o2, y2))) {
      var d2 = S(l2, _2);
      return M(n2), d2;
    }
    N(n2, "incorrect key pair for the given ciphertext");
  }
  function Ze(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "seed");
    var _2, n2 = 0 | r._crypto_box_seedbytes();
    e.length !== n2 && L(a2, "invalid seed length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_box_publickeybytes()), c2 = s2.address;
    a2.push(c2);
    var p2 = new B(0 | r._crypto_box_secretkeybytes()), o2 = p2.address;
    if (a2.push(o2), !(0 | r._crypto_box_seed_keypair(c2, o2, _2))) {
      var h2 = { publicKey: S(s2, t2), privateKey: S(p2, t2), keyType: "x25519" };
      return M(a2), h2;
    }
    N(a2, "invalid usage");
  }
  function $e(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "p");
    var n2, s2 = 0 | r._crypto_core_ed25519_bytes();
    e.length !== s2 && L(_2, "invalid p length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "q");
    var c2, p2 = 0 | r._crypto_core_ed25519_bytes();
    t2.length !== p2 && L(_2, "invalid q length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_core_ed25519_bytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_core_ed25519_add(h2, n2, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "input is an invalid element");
  }
  function er(e, t2) {
    var a2 = [];
    Y(t2);
    var _2 = K(e = O(a2, e, "r"));
    e.length, a2.push(_2);
    var n2 = new B(0 | r._crypto_core_ed25519_bytes()), s2 = n2.address;
    if (a2.push(s2), !(0 | r._crypto_core_ed25519_from_hash(s2, _2))) {
      var c2 = S(n2, t2);
      return M(a2), c2;
    }
    N(a2, "invalid usage");
  }
  function rr(e, t2) {
    var a2 = [];
    Y(t2);
    var _2 = K(e = O(a2, e, "r"));
    e.length, a2.push(_2);
    var n2 = new B(0 | r._crypto_core_ed25519_bytes()), s2 = n2.address;
    if (a2.push(s2), !(0 | r._crypto_core_ed25519_from_uniform(s2, _2))) {
      var c2 = S(n2, t2);
      return M(a2), c2;
    }
    N(a2, "invalid usage");
  }
  function tr(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "repr");
    var _2, n2 = 0 | r._crypto_core_ed25519_bytes();
    e.length !== n2 && L(a2, "invalid repr length"), _2 = K(e), a2.push(_2);
    var s2 = 1 == (0 | r._crypto_core_ed25519_is_valid_point(_2));
    return M(a2), s2;
  }
  function ar(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_core_ed25519_bytes()), _2 = a2.address;
    t2.push(_2), r._crypto_core_ed25519_random(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function _r(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "x");
    var n2, s2 = 0 | r._crypto_core_ed25519_scalarbytes();
    e.length !== s2 && L(_2, "invalid x length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "y");
    var c2, p2 = 0 | r._crypto_core_ed25519_scalarbytes();
    t2.length !== p2 && L(_2, "invalid y length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_core_ed25519_scalarbytes()), h2 = o2.address;
    _2.push(h2), r._crypto_core_ed25519_scalar_add(h2, n2, c2);
    var y2 = S(o2, a2);
    return M(_2), y2;
  }
  function nr(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "s");
    var _2, n2 = 0 | r._crypto_core_ed25519_scalarbytes();
    e.length !== n2 && L(a2, "invalid s length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_core_ed25519_scalarbytes()), c2 = s2.address;
    a2.push(c2), r._crypto_core_ed25519_scalar_complement(c2, _2);
    var p2 = S(s2, t2);
    return M(a2), p2;
  }
  function sr(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "s");
    var _2, n2 = 0 | r._crypto_core_ed25519_scalarbytes();
    e.length !== n2 && L(a2, "invalid s length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_core_ed25519_scalarbytes()), c2 = s2.address;
    if (a2.push(c2), !(0 | r._crypto_core_ed25519_scalar_invert(c2, _2))) {
      var p2 = S(s2, t2);
      return M(a2), p2;
    }
    N(a2, "invalid reciprocate");
  }
  function cr(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "x");
    var n2, s2 = 0 | r._crypto_core_ed25519_scalarbytes();
    e.length !== s2 && L(_2, "invalid x length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "y");
    var c2, p2 = 0 | r._crypto_core_ed25519_scalarbytes();
    t2.length !== p2 && L(_2, "invalid y length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_core_ed25519_scalarbytes()), h2 = o2.address;
    _2.push(h2), r._crypto_core_ed25519_scalar_mul(h2, n2, c2);
    var y2 = S(o2, a2);
    return M(_2), y2;
  }
  function pr(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "s");
    var _2, n2 = 0 | r._crypto_core_ed25519_scalarbytes();
    e.length !== n2 && L(a2, "invalid s length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_core_ed25519_scalarbytes()), c2 = s2.address;
    a2.push(c2), r._crypto_core_ed25519_scalar_negate(c2, _2);
    var p2 = S(s2, t2);
    return M(a2), p2;
  }
  function or(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_core_ed25519_scalarbytes()), _2 = a2.address;
    t2.push(_2), r._crypto_core_ed25519_scalar_random(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function hr(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "sample");
    var _2, n2 = 0 | r._crypto_core_ed25519_nonreducedscalarbytes();
    e.length !== n2 && L(a2, "invalid sample length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_core_ed25519_scalarbytes()), c2 = s2.address;
    a2.push(c2), r._crypto_core_ed25519_scalar_reduce(c2, _2);
    var p2 = S(s2, t2);
    return M(a2), p2;
  }
  function yr(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "x");
    var n2, s2 = 0 | r._crypto_core_ed25519_scalarbytes();
    e.length !== s2 && L(_2, "invalid x length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "y");
    var c2, p2 = 0 | r._crypto_core_ed25519_scalarbytes();
    t2.length !== p2 && L(_2, "invalid y length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_core_ed25519_scalarbytes()), h2 = o2.address;
    _2.push(h2), r._crypto_core_ed25519_scalar_sub(h2, n2, c2);
    var y2 = S(o2, a2);
    return M(_2), y2;
  }
  function ir(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "p");
    var n2, s2 = 0 | r._crypto_core_ed25519_bytes();
    e.length !== s2 && L(_2, "invalid p length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "q");
    var c2, p2 = 0 | r._crypto_core_ed25519_bytes();
    t2.length !== p2 && L(_2, "invalid q length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_core_ed25519_bytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_core_ed25519_sub(h2, n2, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "input is an invalid element");
  }
  function lr(e, t2, a2, _2) {
    var n2 = [];
    Y(_2), e = O(n2, e, "input");
    var s2, c2 = 0 | r._crypto_core_hchacha20_inputbytes();
    e.length !== c2 && L(n2, "invalid input length"), s2 = K(e), n2.push(s2), t2 = O(n2, t2, "privateKey");
    var p2, o2 = 0 | r._crypto_core_hchacha20_keybytes();
    t2.length !== o2 && L(n2, "invalid privateKey length"), p2 = K(t2), n2.push(p2);
    var h2 = null;
    null != a2 && (h2 = K(a2 = O(n2, a2, "constant")), a2.length, n2.push(h2));
    var y2 = new B(0 | r._crypto_core_hchacha20_outputbytes()), i2 = y2.address;
    if (n2.push(i2), !(0 | r._crypto_core_hchacha20(i2, s2, p2, h2))) {
      var l2 = S(y2, _2);
      return M(n2), l2;
    }
    N(n2, "invalid usage");
  }
  function ur(e, t2, a2, _2) {
    var n2 = [];
    Y(_2), e = O(n2, e, "input");
    var s2, c2 = 0 | r._crypto_core_hsalsa20_inputbytes();
    e.length !== c2 && L(n2, "invalid input length"), s2 = K(e), n2.push(s2), t2 = O(n2, t2, "privateKey");
    var p2, o2 = 0 | r._crypto_core_hsalsa20_keybytes();
    t2.length !== o2 && L(n2, "invalid privateKey length"), p2 = K(t2), n2.push(p2);
    var h2 = null;
    null != a2 && (h2 = K(a2 = O(n2, a2, "constant")), a2.length, n2.push(h2));
    var y2 = new B(0 | r._crypto_core_hsalsa20_outputbytes()), i2 = y2.address;
    if (n2.push(i2), !(0 | r._crypto_core_hsalsa20(i2, s2, p2, h2))) {
      var l2 = S(y2, _2);
      return M(n2), l2;
    }
    N(n2, "invalid usage");
  }
  function dr(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "p");
    var n2, s2 = 0 | r._crypto_core_ristretto255_bytes();
    e.length !== s2 && L(_2, "invalid p length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "q");
    var c2, p2 = 0 | r._crypto_core_ristretto255_bytes();
    t2.length !== p2 && L(_2, "invalid q length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_core_ristretto255_bytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_core_ristretto255_add(h2, n2, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "input is an invalid element");
  }
  function vr(e, t2) {
    var a2 = [];
    Y(t2);
    var _2 = K(e = O(a2, e, "r"));
    e.length, a2.push(_2);
    var n2 = new B(0 | r._crypto_core_ristretto255_bytes()), s2 = n2.address;
    if (a2.push(s2), !(0 | r._crypto_core_ristretto255_from_hash(s2, _2))) {
      var c2 = S(n2, t2);
      return M(a2), c2;
    }
    N(a2, "invalid usage");
  }
  function gr(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "repr");
    var _2, n2 = 0 | r._crypto_core_ristretto255_bytes();
    e.length !== n2 && L(a2, "invalid repr length"), _2 = K(e), a2.push(_2);
    var s2 = 1 == (0 | r._crypto_core_ristretto255_is_valid_point(_2));
    return M(a2), s2;
  }
  function br(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_core_ristretto255_bytes()), _2 = a2.address;
    t2.push(_2), r._crypto_core_ristretto255_random(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function fr(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "x");
    var n2, s2 = 0 | r._crypto_core_ristretto255_scalarbytes();
    e.length !== s2 && L(_2, "invalid x length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "y");
    var c2, p2 = 0 | r._crypto_core_ristretto255_scalarbytes();
    t2.length !== p2 && L(_2, "invalid y length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_core_ristretto255_scalarbytes()), h2 = o2.address;
    _2.push(h2), r._crypto_core_ristretto255_scalar_add(h2, n2, c2);
    var y2 = S(o2, a2);
    return M(_2), y2;
  }
  function mr(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "s");
    var _2, n2 = 0 | r._crypto_core_ristretto255_scalarbytes();
    e.length !== n2 && L(a2, "invalid s length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_core_ristretto255_scalarbytes()), c2 = s2.address;
    a2.push(c2), r._crypto_core_ristretto255_scalar_complement(c2, _2);
    var p2 = S(s2, t2);
    return M(a2), p2;
  }
  function kr(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "s");
    var _2, n2 = 0 | r._crypto_core_ristretto255_scalarbytes();
    e.length !== n2 && L(a2, "invalid s length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_core_ristretto255_scalarbytes()), c2 = s2.address;
    if (a2.push(c2), !(0 | r._crypto_core_ristretto255_scalar_invert(c2, _2))) {
      var p2 = S(s2, t2);
      return M(a2), p2;
    }
    N(a2, "invalid reciprocate");
  }
  function xr(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "x");
    var n2, s2 = 0 | r._crypto_core_ristretto255_scalarbytes();
    e.length !== s2 && L(_2, "invalid x length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "y");
    var c2, p2 = 0 | r._crypto_core_ristretto255_scalarbytes();
    t2.length !== p2 && L(_2, "invalid y length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_core_ristretto255_scalarbytes()), h2 = o2.address;
    _2.push(h2), r._crypto_core_ristretto255_scalar_mul(h2, n2, c2);
    var y2 = S(o2, a2);
    return M(_2), y2;
  }
  function Er(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "s");
    var _2, n2 = 0 | r._crypto_core_ristretto255_scalarbytes();
    e.length !== n2 && L(a2, "invalid s length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_core_ristretto255_scalarbytes()), c2 = s2.address;
    a2.push(c2), r._crypto_core_ristretto255_scalar_negate(c2, _2);
    var p2 = S(s2, t2);
    return M(a2), p2;
  }
  function Tr(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_core_ristretto255_scalarbytes()), _2 = a2.address;
    t2.push(_2), r._crypto_core_ristretto255_scalar_random(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function Sr(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "sample");
    var _2, n2 = 0 | r._crypto_core_ristretto255_nonreducedscalarbytes();
    e.length !== n2 && L(a2, "invalid sample length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_core_ristretto255_scalarbytes()), c2 = s2.address;
    a2.push(c2), r._crypto_core_ristretto255_scalar_reduce(c2, _2);
    var p2 = S(s2, t2);
    return M(a2), p2;
  }
  function wr(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "x");
    var n2, s2 = 0 | r._crypto_core_ristretto255_scalarbytes();
    e.length !== s2 && L(_2, "invalid x length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "y");
    var c2, p2 = 0 | r._crypto_core_ristretto255_scalarbytes();
    t2.length !== p2 && L(_2, "invalid y length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_core_ristretto255_scalarbytes()), h2 = o2.address;
    _2.push(h2), r._crypto_core_ristretto255_scalar_sub(h2, n2, c2);
    var y2 = S(o2, a2);
    return M(_2), y2;
  }
  function Yr(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "p");
    var n2, s2 = 0 | r._crypto_core_ristretto255_bytes();
    e.length !== s2 && L(_2, "invalid p length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "q");
    var c2, p2 = 0 | r._crypto_core_ristretto255_bytes();
    t2.length !== p2 && L(_2, "invalid q length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_core_ristretto255_bytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_core_ristretto255_sub(h2, n2, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "input is an invalid element");
  }
  function Br(e, t2, a2, _2) {
    var n2 = [];
    Y(_2), U(n2, e, "hash_length"), ("number" != typeof e || (0 | e) !== e || e < 0) && L(n2, "hash_length must be an unsigned integer");
    var s2 = K(t2 = O(n2, t2, "message")), c2 = t2.length;
    n2.push(s2);
    var p2 = null, o2 = 0;
    null != a2 && (p2 = K(a2 = O(n2, a2, "key")), o2 = a2.length, n2.push(p2));
    var h2 = new B(e |= 0), y2 = h2.address;
    if (n2.push(y2), !(0 | r._crypto_generichash(y2, e, s2, c2, 0, p2, o2))) {
      var i2 = S(h2, _2);
      return M(n2), i2;
    }
    N(n2, "invalid usage");
  }
  function Kr(e, t2, a2, _2, n2) {
    var s2 = [];
    Y(n2), U(s2, e, "subkey_len"), ("number" != typeof e || (0 | e) !== e || e < 0) && L(s2, "subkey_len must be an unsigned integer");
    var c2 = null, p2 = 0;
    null != t2 && (c2 = K(t2 = O(s2, t2, "key")), p2 = t2.length, s2.push(c2));
    var o2 = null, h2 = 0;
    null != a2 && (a2 = O(s2, a2, "id"), h2 = 0 | r._crypto_generichash_blake2b_saltbytes(), a2.length !== h2 && L(s2, "invalid id length"), o2 = K(a2), s2.push(o2));
    var y2 = null, i2 = 0;
    null != _2 && (_2 = O(s2, _2, "ctx"), i2 = 0 | r._crypto_generichash_blake2b_personalbytes(), _2.length !== i2 && L(s2, "invalid ctx length"), y2 = K(_2), s2.push(y2));
    var l2 = new B(0 | e), u2 = l2.address;
    if (s2.push(u2), !(0 | r._crypto_generichash_blake2b_salt_personal(u2, e, null, 0, 0, c2, p2, o2, y2))) {
      var d2 = S(l2, n2);
      return M(s2), d2;
    }
    N(s2, "invalid usage");
  }
  function Ar(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "state_address"), U(_2, t2, "hash_length"), ("number" != typeof t2 || (0 | t2) !== t2 || t2 < 0) && L(_2, "hash_length must be an unsigned integer");
    var n2 = new B(t2 |= 0), s2 = n2.address;
    if (_2.push(s2), !(0 | r._crypto_generichash_final(e, s2, t2))) {
      var c2 = (r._free(e), S(n2, a2));
      return M(_2), c2;
    }
    N(_2, "invalid usage");
  }
  function Ir(e, t2, a2) {
    var _2 = [];
    Y(a2);
    var n2 = null, s2 = 0;
    null != e && (n2 = K(e = O(_2, e, "key")), s2 = e.length, _2.push(n2)), U(_2, t2, "hash_length"), ("number" != typeof t2 || (0 | t2) !== t2 || t2 < 0) && L(_2, "hash_length must be an unsigned integer");
    var c2 = new B(357).address;
    if (!(0 | r._crypto_generichash_init(c2, n2, s2, t2))) {
      var p2 = c2;
      return M(_2), p2;
    }
    N(_2, "invalid usage");
  }
  function Mr(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_generichash_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_generichash_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function Nr(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "state_address");
    var n2 = K(t2 = O(_2, t2, "message_chunk")), s2 = t2.length;
    _2.push(n2), 0 | r._crypto_generichash_update(e, n2, s2) && N(_2, "invalid usage"), M(_2);
  }
  function Lr(e, t2) {
    var a2 = [];
    Y(t2);
    var _2 = K(e = O(a2, e, "message")), n2 = e.length;
    a2.push(_2);
    var s2 = new B(0 | r._crypto_hash_bytes()), c2 = s2.address;
    if (a2.push(c2), !(0 | r._crypto_hash(c2, _2, n2, 0))) {
      var p2 = S(s2, t2);
      return M(a2), p2;
    }
    N(a2, "invalid usage");
  }
  function Ur(e, t2) {
    var a2 = [];
    Y(t2);
    var _2 = K(e = O(a2, e, "message")), n2 = e.length;
    a2.push(_2);
    var s2 = new B(0 | r._crypto_hash_sha256_bytes()), c2 = s2.address;
    if (a2.push(c2), !(0 | r._crypto_hash_sha256(c2, _2, n2, 0))) {
      var p2 = S(s2, t2);
      return M(a2), p2;
    }
    N(a2, "invalid usage");
  }
  function Or(e, t2) {
    var a2 = [];
    Y(t2), U(a2, e, "state_address");
    var _2 = new B(0 | r._crypto_hash_sha256_bytes()), n2 = _2.address;
    if (a2.push(n2), !(0 | r._crypto_hash_sha256_final(e, n2))) {
      var s2 = (r._free(e), S(_2, t2));
      return M(a2), s2;
    }
    N(a2, "invalid usage");
  }
  function Cr(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(104).address;
    if (!(0 | r._crypto_hash_sha256_init(a2))) {
      var _2 = a2;
      return M(t2), _2;
    }
    N(t2, "invalid usage");
  }
  function Rr(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "state_address");
    var n2 = K(t2 = O(_2, t2, "message_chunk")), s2 = t2.length;
    _2.push(n2), 0 | r._crypto_hash_sha256_update(e, n2, s2) && N(_2, "invalid usage"), M(_2);
  }
  function Pr(e, t2) {
    var a2 = [];
    Y(t2);
    var _2 = K(e = O(a2, e, "message")), n2 = e.length;
    a2.push(_2);
    var s2 = new B(0 | r._crypto_hash_sha3256_bytes()), c2 = s2.address;
    if (a2.push(c2), !(0 | r._crypto_hash_sha3256(c2, _2, n2))) {
      var p2 = S(s2, t2);
      return M(a2), p2;
    }
    N(a2, "invalid usage");
  }
  function Xr(e, t2) {
    var a2 = [];
    Y(t2), U(a2, e, "state_address");
    var _2 = new B(0 | r._crypto_hash_sha3256_bytes()), n2 = _2.address;
    if (a2.push(n2), !(0 | r._crypto_hash_sha3256_final(e, n2))) {
      var s2 = (r._free(e), S(_2, t2));
      return M(a2), s2;
    }
    N(a2, "invalid usage");
  }
  function Dr(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(256).address;
    if (!(0 | r._crypto_hash_sha3256_init(a2))) {
      var _2 = a2;
      return M(t2), _2;
    }
    N(t2, "invalid usage");
  }
  function Gr(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "state_address");
    var n2 = K(t2 = O(_2, t2, "message_chunk")), s2 = t2.length;
    _2.push(n2), 0 | r._crypto_hash_sha3256_update(e, n2, s2) && N(_2, "invalid usage"), M(_2);
  }
  function Fr(e, t2) {
    var a2 = [];
    Y(t2);
    var _2 = K(e = O(a2, e, "message")), n2 = e.length;
    a2.push(_2);
    var s2 = new B(0 | r._crypto_hash_sha3512_bytes()), c2 = s2.address;
    if (a2.push(c2), !(0 | r._crypto_hash_sha3512(c2, _2, n2))) {
      var p2 = S(s2, t2);
      return M(a2), p2;
    }
    N(a2, "invalid usage");
  }
  function Vr(e, t2) {
    var a2 = [];
    Y(t2), U(a2, e, "state_address");
    var _2 = new B(0 | r._crypto_hash_sha3512_bytes()), n2 = _2.address;
    if (a2.push(n2), !(0 | r._crypto_hash_sha3512_final(e, n2))) {
      var s2 = (r._free(e), S(_2, t2));
      return M(a2), s2;
    }
    N(a2, "invalid usage");
  }
  function qr(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(256).address;
    if (!(0 | r._crypto_hash_sha3512_init(a2))) {
      var _2 = a2;
      return M(t2), _2;
    }
    N(t2, "invalid usage");
  }
  function Hr(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "state_address");
    var n2 = K(t2 = O(_2, t2, "message_chunk")), s2 = t2.length;
    _2.push(n2), 0 | r._crypto_hash_sha3512_update(e, n2, s2) && N(_2, "invalid usage"), M(_2);
  }
  function zr(e, t2) {
    var a2 = [];
    Y(t2);
    var _2 = K(e = O(a2, e, "message")), n2 = e.length;
    a2.push(_2);
    var s2 = new B(0 | r._crypto_hash_sha512_bytes()), c2 = s2.address;
    if (a2.push(c2), !(0 | r._crypto_hash_sha512(c2, _2, n2, 0))) {
      var p2 = S(s2, t2);
      return M(a2), p2;
    }
    N(a2, "invalid usage");
  }
  function Wr(e, t2) {
    var a2 = [];
    Y(t2), U(a2, e, "state_address");
    var _2 = new B(0 | r._crypto_hash_sha512_bytes()), n2 = _2.address;
    if (a2.push(n2), !(0 | r._crypto_hash_sha512_final(e, n2))) {
      var s2 = (r._free(e), S(_2, t2));
      return M(a2), s2;
    }
    N(a2, "invalid usage");
  }
  function jr(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(208).address;
    if (!(0 | r._crypto_hash_sha512_init(a2))) {
      var _2 = a2;
      return M(t2), _2;
    }
    N(t2, "invalid usage");
  }
  function Jr(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "state_address");
    var n2 = K(t2 = O(_2, t2, "message_chunk")), s2 = t2.length;
    _2.push(n2), 0 | r._crypto_hash_sha512_update(e, n2, s2) && N(_2, "invalid usage"), M(_2);
  }
  function Qr(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "input");
    var n2, s2 = 0 | r._crypto_ipcrypt_bytes();
    e.length !== s2 && L(_2, "invalid input length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "key");
    var c2, p2 = 0 | r._crypto_ipcrypt_keybytes();
    t2.length !== p2 && L(_2, "invalid key length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_ipcrypt_bytes()), h2 = o2.address;
    _2.push(h2), r._crypto_ipcrypt_decrypt(h2, n2, c2);
    var y2 = S(o2, a2);
    return M(_2), y2;
  }
  function Zr(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "input");
    var n2, s2 = 0 | r._crypto_ipcrypt_bytes();
    e.length !== s2 && L(_2, "invalid input length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "key");
    var c2, p2 = 0 | r._crypto_ipcrypt_keybytes();
    t2.length !== p2 && L(_2, "invalid key length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_ipcrypt_bytes()), h2 = o2.address;
    _2.push(h2), r._crypto_ipcrypt_encrypt(h2, n2, c2);
    var y2 = S(o2, a2);
    return M(_2), y2;
  }
  function $r(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_ipcrypt_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_ipcrypt_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function et(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "input");
    var n2, s2 = 0 | r._crypto_ipcrypt_nd_outputbytes();
    e.length !== s2 && L(_2, "invalid input length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "key");
    var c2, p2 = 0 | r._crypto_ipcrypt_nd_keybytes();
    t2.length !== p2 && L(_2, "invalid key length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_ipcrypt_nd_inputbytes()), h2 = o2.address;
    _2.push(h2), r._crypto_ipcrypt_nd_decrypt(h2, n2, c2);
    var y2 = S(o2, a2);
    return M(_2), y2;
  }
  function rt(e, t2, a2, _2) {
    var n2 = [];
    Y(_2), e = O(n2, e, "input");
    var s2, c2 = 0 | r._crypto_ipcrypt_nd_inputbytes();
    e.length !== c2 && L(n2, "invalid input length"), s2 = K(e), n2.push(s2), t2 = O(n2, t2, "tweak");
    var p2, o2 = 0 | r._crypto_ipcrypt_nd_tweakbytes();
    t2.length !== o2 && L(n2, "invalid tweak length"), p2 = K(t2), n2.push(p2), a2 = O(n2, a2, "key");
    var h2, y2 = 0 | r._crypto_ipcrypt_nd_keybytes();
    a2.length !== y2 && L(n2, "invalid key length"), h2 = K(a2), n2.push(h2);
    var i2 = new B(0 | r._crypto_ipcrypt_nd_outputbytes()), l2 = i2.address;
    n2.push(l2), r._crypto_ipcrypt_nd_encrypt(l2, s2, p2, h2);
    var u2 = S(i2, _2);
    return M(n2), u2;
  }
  function tt(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_ipcrypt_nd_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_ipcrypt_nd_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function at(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "input");
    var n2, s2 = 0 | r._crypto_ipcrypt_ndx_outputbytes();
    e.length !== s2 && L(_2, "invalid input length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "key");
    var c2, p2 = 0 | r._crypto_ipcrypt_ndx_keybytes();
    t2.length !== p2 && L(_2, "invalid key length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_ipcrypt_ndx_inputbytes()), h2 = o2.address;
    _2.push(h2), r._crypto_ipcrypt_ndx_decrypt(h2, n2, c2);
    var y2 = S(o2, a2);
    return M(_2), y2;
  }
  function _t(e, t2, a2, _2) {
    var n2 = [];
    Y(_2), e = O(n2, e, "input");
    var s2, c2 = 0 | r._crypto_ipcrypt_ndx_inputbytes();
    e.length !== c2 && L(n2, "invalid input length"), s2 = K(e), n2.push(s2), t2 = O(n2, t2, "tweak");
    var p2, o2 = 0 | r._crypto_ipcrypt_ndx_tweakbytes();
    t2.length !== o2 && L(n2, "invalid tweak length"), p2 = K(t2), n2.push(p2), a2 = O(n2, a2, "key");
    var h2, y2 = 0 | r._crypto_ipcrypt_ndx_keybytes();
    a2.length !== y2 && L(n2, "invalid key length"), h2 = K(a2), n2.push(h2);
    var i2 = new B(0 | r._crypto_ipcrypt_ndx_outputbytes()), l2 = i2.address;
    n2.push(l2), r._crypto_ipcrypt_ndx_encrypt(l2, s2, p2, h2);
    var u2 = S(i2, _2);
    return M(n2), u2;
  }
  function nt(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_ipcrypt_ndx_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_ipcrypt_ndx_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function st(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "input");
    var n2, s2 = 0 | r._crypto_ipcrypt_pfx_bytes();
    e.length !== s2 && L(_2, "invalid input length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "key");
    var c2, p2 = 0 | r._crypto_ipcrypt_pfx_keybytes();
    t2.length !== p2 && L(_2, "invalid key length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_ipcrypt_pfx_bytes()), h2 = o2.address;
    _2.push(h2), r._crypto_ipcrypt_pfx_decrypt(h2, n2, c2);
    var y2 = S(o2, a2);
    return M(_2), y2;
  }
  function ct(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "input");
    var n2, s2 = 0 | r._crypto_ipcrypt_pfx_bytes();
    e.length !== s2 && L(_2, "invalid input length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "key");
    var c2, p2 = 0 | r._crypto_ipcrypt_pfx_keybytes();
    t2.length !== p2 && L(_2, "invalid key length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_ipcrypt_pfx_bytes()), h2 = o2.address;
    _2.push(h2), r._crypto_ipcrypt_pfx_encrypt(h2, n2, c2);
    var y2 = S(o2, a2);
    return M(_2), y2;
  }
  function pt(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_ipcrypt_pfx_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_ipcrypt_pfx_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function ot(e, t2, a2, _2, n2) {
    var s2 = [];
    Y(n2), U(s2, e, "subkey_len"), ("number" != typeof e || (0 | e) !== e || e < 0) && L(s2, "subkey_len must be an unsigned integer"), U(s2, t2, "subkey_id");
    var c2, p2 = 0;
    if ("bigint" == typeof t2 && t2 >= BigInt(0)) {
      const e2 = t2 >> BigInt(32);
      e2 > BigInt(4294967295) && L(s2, "subkey_id cannot be more than 64 bits"), p2 = Number(e2), c2 = Number(t2 & BigInt(4294967295));
    } else "number" == typeof t2 && (0 | t2) === t2 && t2 >= 0 ? c2 = t2 : L(s2, "subkey_id must be an unsigned integer or bigint");
    "string" != typeof a2 && L(s2, "ctx must be a string"), (a2 = v(a2 + "\0")).length - 1 !== r._crypto_kdf_contextbytes() && L(s2, "invalid ctx length");
    var o2 = K(a2);
    a2.length, s2.push(o2), _2 = O(s2, _2, "key");
    var h2, y2 = 0 | r._crypto_kdf_keybytes();
    _2.length !== y2 && L(s2, "invalid key length"), h2 = K(_2), s2.push(h2);
    var i2 = new B(0 | e), l2 = i2.address;
    s2.push(l2), r._crypto_kdf_derive_from_key(l2, e, c2, p2, o2, h2);
    var u2 = S(i2, n2);
    return M(s2), u2;
  }
  function ht(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_kdf_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_kdf_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function yt(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "ciphertext");
    var n2, s2 = 0 | r._crypto_kem_ciphertextbytes();
    e.length !== s2 && L(_2, "invalid ciphertext length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "privateKey");
    var c2, p2 = 0 | r._crypto_kem_secretkeybytes();
    t2.length !== p2 && L(_2, "invalid privateKey length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_kem_sharedsecretbytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_kem_dec(h2, n2, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "invalid usage");
  }
  function it(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "publicKey");
    var _2, n2 = 0 | r._crypto_kem_publickeybytes();
    e.length !== n2 && L(a2, "invalid publicKey length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_kem_ciphertextbytes()), c2 = s2.address;
    a2.push(c2);
    var p2 = new B(0 | r._crypto_kem_sharedsecretbytes()), o2 = p2.address;
    if (a2.push(o2), !(0 | r._crypto_kem_enc(c2, o2, _2))) {
      var h2 = S({ ciphertext: s2, sharedSecret: p2 }, t2);
      return M(a2), h2;
    }
    N(a2, "invalid usage");
  }
  function lt(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_kem_publickeybytes()), _2 = a2.address;
    t2.push(_2);
    var n2 = new B(0 | r._crypto_kem_secretkeybytes()), s2 = n2.address;
    if (t2.push(s2), !(0 | r._crypto_kem_keypair(_2, s2))) {
      var c2 = { publicKey: S(a2, e), privateKey: S(n2, e), keyType: "xwing" };
      return M(t2), c2;
    }
    N(t2, "internal error");
  }
  function ut(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "ciphertext");
    var n2, s2 = 0 | r._crypto_kem_mlkem768_ciphertextbytes();
    e.length !== s2 && L(_2, "invalid ciphertext length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "privateKey");
    var c2, p2 = 0 | r._crypto_kem_mlkem768_secretkeybytes();
    t2.length !== p2 && L(_2, "invalid privateKey length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_kem_mlkem768_sharedsecretbytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_kem_mlkem768_dec(h2, n2, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "invalid usage");
  }
  function dt(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "publicKey");
    var _2, n2 = 0 | r._crypto_kem_mlkem768_publickeybytes();
    e.length !== n2 && L(a2, "invalid publicKey length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_kem_mlkem768_ciphertextbytes()), c2 = s2.address;
    a2.push(c2);
    var p2 = new B(0 | r._crypto_kem_mlkem768_sharedsecretbytes()), o2 = p2.address;
    if (a2.push(o2), !(0 | r._crypto_kem_mlkem768_enc(c2, o2, _2))) {
      var h2 = S({ ciphertext: s2, sharedSecret: p2 }, t2);
      return M(a2), h2;
    }
    N(a2, "invalid usage");
  }
  function vt(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "publicKey");
    var n2, s2, c2 = 0 | r._crypto_kem_mlkem768_publickeybytes();
    e.length !== c2 && L(_2, "invalid publicKey length"), n2 = K(e), _2.push(n2), 32 !== (t2 = O(_2, t2, "seed")).length && L(_2, "invalid seed length"), s2 = K(t2), _2.push(s2);
    var p2 = new B(0 | r._crypto_kem_mlkem768_ciphertextbytes()), o2 = p2.address;
    _2.push(o2);
    var h2 = new B(0 | r._crypto_kem_mlkem768_sharedsecretbytes()), y2 = h2.address;
    if (_2.push(y2), !(0 | r._crypto_kem_mlkem768_enc_deterministic(o2, y2, n2, s2))) {
      var i2 = S({ ciphertext: p2, sharedSecret: h2 }, a2);
      return M(_2), i2;
    }
    N(_2, "invalid usage");
  }
  function gt(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_kem_mlkem768_publickeybytes()), _2 = a2.address;
    t2.push(_2);
    var n2 = new B(0 | r._crypto_kem_mlkem768_secretkeybytes()), s2 = n2.address;
    if (t2.push(s2), !(0 | r._crypto_kem_mlkem768_keypair(_2, s2))) {
      var c2 = { publicKey: S(a2, e), privateKey: S(n2, e), keyType: "ml-kem-768" };
      return M(t2), c2;
    }
    N(t2, "internal error");
  }
  function bt(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "seed");
    var _2, n2 = 0 | r._crypto_kem_mlkem768_seedbytes();
    e.length !== n2 && L(a2, "invalid seed length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_kem_mlkem768_publickeybytes()), c2 = s2.address;
    a2.push(c2);
    var p2 = new B(0 | r._crypto_kem_mlkem768_secretkeybytes()), o2 = p2.address;
    if (a2.push(o2), !(0 | r._crypto_kem_mlkem768_seed_keypair(c2, o2, _2))) {
      var h2 = { publicKey: S(s2, t2), privateKey: S(p2, t2), keyType: "ml-kem-768" };
      return M(a2), h2;
    }
    N(a2, "invalid usage");
  }
  function ft() {
    var e = r._crypto_kem_primitive(), t2 = r.UTF8ToString(e);
    return M([]), t2;
  }
  function mt(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "seed");
    var _2, n2 = 0 | r._crypto_kem_seedbytes();
    e.length !== n2 && L(a2, "invalid seed length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_kem_publickeybytes()), c2 = s2.address;
    a2.push(c2);
    var p2 = new B(0 | r._crypto_kem_secretkeybytes()), o2 = p2.address;
    if (a2.push(o2), !(0 | r._crypto_kem_seed_keypair(c2, o2, _2))) {
      var h2 = { publicKey: S(s2, t2), privateKey: S(p2, t2), keyType: "xwing" };
      return M(a2), h2;
    }
    N(a2, "invalid usage");
  }
  function kt(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "ciphertext");
    var n2, s2 = 0 | r._crypto_kem_xwing_ciphertextbytes();
    e.length !== s2 && L(_2, "invalid ciphertext length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "privateKey");
    var c2, p2 = 0 | r._crypto_kem_xwing_secretkeybytes();
    t2.length !== p2 && L(_2, "invalid privateKey length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_kem_xwing_sharedsecretbytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_kem_xwing_dec(h2, n2, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "invalid usage");
  }
  function xt(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "publicKey");
    var _2, n2 = 0 | r._crypto_kem_xwing_publickeybytes();
    e.length !== n2 && L(a2, "invalid publicKey length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_kem_xwing_ciphertextbytes()), c2 = s2.address;
    a2.push(c2);
    var p2 = new B(0 | r._crypto_kem_xwing_sharedsecretbytes()), o2 = p2.address;
    if (a2.push(o2), !(0 | r._crypto_kem_xwing_enc(c2, o2, _2))) {
      var h2 = S({ ciphertext: s2, sharedSecret: p2 }, t2);
      return M(a2), h2;
    }
    N(a2, "invalid usage");
  }
  function Et(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "publicKey");
    var n2, s2, c2 = 0 | r._crypto_kem_xwing_publickeybytes();
    e.length !== c2 && L(_2, "invalid publicKey length"), n2 = K(e), _2.push(n2), 64 !== (t2 = O(_2, t2, "seed")).length && L(_2, "invalid seed length"), s2 = K(t2), _2.push(s2);
    var p2 = new B(0 | r._crypto_kem_xwing_ciphertextbytes()), o2 = p2.address;
    _2.push(o2);
    var h2 = new B(0 | r._crypto_kem_xwing_sharedsecretbytes()), y2 = h2.address;
    if (_2.push(y2), !(0 | r._crypto_kem_xwing_enc_deterministic(o2, y2, n2, s2))) {
      var i2 = S({ ciphertext: p2, sharedSecret: h2 }, a2);
      return M(_2), i2;
    }
    N(_2, "invalid usage");
  }
  function Tt(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_kem_xwing_publickeybytes()), _2 = a2.address;
    t2.push(_2);
    var n2 = new B(0 | r._crypto_kem_xwing_secretkeybytes()), s2 = n2.address;
    if (t2.push(s2), !(0 | r._crypto_kem_xwing_keypair(_2, s2))) {
      var c2 = { publicKey: S(a2, e), privateKey: S(n2, e), keyType: "xwing" };
      return M(t2), c2;
    }
    N(t2, "internal error");
  }
  function St(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "seed");
    var _2, n2 = 0 | r._crypto_kem_xwing_seedbytes();
    e.length !== n2 && L(a2, "invalid seed length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_kem_xwing_publickeybytes()), c2 = s2.address;
    a2.push(c2);
    var p2 = new B(0 | r._crypto_kem_xwing_secretkeybytes()), o2 = p2.address;
    if (a2.push(o2), !(0 | r._crypto_kem_xwing_seed_keypair(c2, o2, _2))) {
      var h2 = { publicKey: S(s2, t2), privateKey: S(p2, t2), keyType: "xwing" };
      return M(a2), h2;
    }
    N(a2, "invalid usage");
  }
  function wt(e, t2, a2, _2) {
    var n2 = [];
    Y(_2), e = O(n2, e, "clientPublicKey");
    var s2, c2 = 0 | r._crypto_kx_publickeybytes();
    e.length !== c2 && L(n2, "invalid clientPublicKey length"), s2 = K(e), n2.push(s2), t2 = O(n2, t2, "clientSecretKey");
    var p2, o2 = 0 | r._crypto_kx_secretkeybytes();
    t2.length !== o2 && L(n2, "invalid clientSecretKey length"), p2 = K(t2), n2.push(p2), a2 = O(n2, a2, "serverPublicKey");
    var h2, y2 = 0 | r._crypto_kx_publickeybytes();
    a2.length !== y2 && L(n2, "invalid serverPublicKey length"), h2 = K(a2), n2.push(h2);
    var i2 = new B(0 | r._crypto_kx_sessionkeybytes()), l2 = i2.address;
    n2.push(l2);
    var u2 = new B(0 | r._crypto_kx_sessionkeybytes()), d2 = u2.address;
    if (n2.push(d2), !(0 | r._crypto_kx_client_session_keys(l2, d2, s2, p2, h2))) {
      var v2 = S({ sharedRx: i2, sharedTx: u2 }, _2);
      return M(n2), v2;
    }
    N(n2, "invalid usage");
  }
  function Yt(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_kx_publickeybytes()), _2 = a2.address;
    t2.push(_2);
    var n2 = new B(0 | r._crypto_kx_secretkeybytes()), s2 = n2.address;
    if (t2.push(s2), !(0 | r._crypto_kx_keypair(_2, s2))) {
      var c2 = { publicKey: S(a2, e), privateKey: S(n2, e), keyType: "x25519" };
      return M(t2), c2;
    }
    N(t2, "internal error");
  }
  function Bt(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "seed");
    var _2, n2 = 0 | r._crypto_kx_seedbytes();
    e.length !== n2 && L(a2, "invalid seed length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_kx_publickeybytes()), c2 = s2.address;
    a2.push(c2);
    var p2 = new B(0 | r._crypto_kx_secretkeybytes()), o2 = p2.address;
    if (a2.push(o2), !(0 | r._crypto_kx_seed_keypair(c2, o2, _2))) {
      var h2 = { publicKey: S(s2, t2), privateKey: S(p2, t2), keyType: "x25519" };
      return M(a2), h2;
    }
    N(a2, "internal error");
  }
  function Kt(e, t2, a2, _2) {
    var n2 = [];
    Y(_2), e = O(n2, e, "serverPublicKey");
    var s2, c2 = 0 | r._crypto_kx_publickeybytes();
    e.length !== c2 && L(n2, "invalid serverPublicKey length"), s2 = K(e), n2.push(s2), t2 = O(n2, t2, "serverSecretKey");
    var p2, o2 = 0 | r._crypto_kx_secretkeybytes();
    t2.length !== o2 && L(n2, "invalid serverSecretKey length"), p2 = K(t2), n2.push(p2), a2 = O(n2, a2, "clientPublicKey");
    var h2, y2 = 0 | r._crypto_kx_publickeybytes();
    a2.length !== y2 && L(n2, "invalid clientPublicKey length"), h2 = K(a2), n2.push(h2);
    var i2 = new B(0 | r._crypto_kx_sessionkeybytes()), l2 = i2.address;
    n2.push(l2);
    var u2 = new B(0 | r._crypto_kx_sessionkeybytes()), d2 = u2.address;
    if (n2.push(d2), !(0 | r._crypto_kx_server_session_keys(l2, d2, s2, p2, h2))) {
      var v2 = S({ sharedRx: i2, sharedTx: u2 }, _2);
      return M(n2), v2;
    }
    N(n2, "invalid usage");
  }
  function At(e, t2, a2) {
    var _2 = [];
    Y(a2);
    var n2 = K(e = O(_2, e, "message")), s2 = e.length;
    _2.push(n2), t2 = O(_2, t2, "key");
    var c2, p2 = 0 | r._crypto_onetimeauth_keybytes();
    t2.length !== p2 && L(_2, "invalid key length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_onetimeauth_bytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_onetimeauth(h2, n2, s2, 0, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "invalid usage");
  }
  function It(e, t2) {
    var a2 = [];
    Y(t2), U(a2, e, "state_address");
    var _2 = new B(0 | r._crypto_onetimeauth_bytes()), n2 = _2.address;
    if (a2.push(n2), !(0 | r._crypto_onetimeauth_final(e, n2))) {
      var s2 = (r._free(e), S(_2, t2));
      return M(a2), s2;
    }
    N(a2, "invalid usage");
  }
  function Mt(e, t2) {
    var a2 = [];
    Y(t2);
    var _2 = null;
    null != e && (_2 = K(e = O(a2, e, "key")), e.length, a2.push(_2));
    var n2 = new B(144).address;
    if (!(0 | r._crypto_onetimeauth_init(n2, _2))) {
      var s2 = n2;
      return M(a2), s2;
    }
    N(a2, "invalid usage");
  }
  function Nt(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_onetimeauth_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_onetimeauth_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function Lt(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "state_address");
    var n2 = K(t2 = O(_2, t2, "message_chunk")), s2 = t2.length;
    _2.push(n2), 0 | r._crypto_onetimeauth_update(e, n2, s2) && N(_2, "invalid usage"), M(_2);
  }
  function Ut(e, t2, a2) {
    var _2 = [];
    e = O(_2, e, "hash");
    var n2, s2 = 0 | r._crypto_onetimeauth_bytes();
    e.length !== s2 && L(_2, "invalid hash length"), n2 = K(e), _2.push(n2);
    var c2 = K(t2 = O(_2, t2, "message")), p2 = t2.length;
    _2.push(c2), a2 = O(_2, a2, "key");
    var o2, h2 = 0 | r._crypto_onetimeauth_keybytes();
    a2.length !== h2 && L(_2, "invalid key length"), o2 = K(a2), _2.push(o2);
    var y2 = !(0 | r._crypto_onetimeauth_verify(n2, c2, p2, 0, o2));
    return M(_2), y2;
  }
  function Ot(e, t2, a2, _2, n2, s2, c2) {
    var p2 = [];
    Y(c2), U(p2, e, "keyLength"), ("number" != typeof e || (0 | e) !== e || e < 0) && L(p2, "keyLength must be an unsigned integer");
    var o2 = K(t2 = O(p2, t2, "password")), h2 = t2.length;
    p2.push(o2), a2 = O(p2, a2, "salt");
    var y2, i2 = 0 | r._crypto_pwhash_saltbytes();
    a2.length !== i2 && L(p2, "invalid salt length"), y2 = K(a2), p2.push(y2), U(p2, _2, "opsLimit"), ("number" != typeof _2 || (0 | _2) !== _2 || _2 < 0) && L(p2, "opsLimit must be an unsigned integer"), U(p2, n2, "memLimit"), ("number" != typeof n2 || (0 | n2) !== n2 || n2 < 0) && L(p2, "memLimit must be an unsigned integer"), U(p2, s2, "algorithm"), ("number" != typeof s2 || (0 | s2) !== s2 || s2 < 0) && L(p2, "algorithm must be an unsigned integer");
    var l2 = new B(0 | e), u2 = l2.address;
    if (p2.push(u2), !(0 | r._crypto_pwhash(u2, e, 0, o2, h2, 0, y2, _2, 0, n2, s2))) {
      var d2 = S(l2, c2);
      return M(p2), d2;
    }
    N(p2, "invalid usage");
  }
  function Ct(e, t2, a2, _2, n2, s2) {
    var c2 = [];
    Y(s2), U(c2, e, "keyLength"), ("number" != typeof e || (0 | e) !== e || e < 0) && L(c2, "keyLength must be an unsigned integer");
    var p2 = K(t2 = O(c2, t2, "password")), o2 = t2.length;
    c2.push(p2), a2 = O(c2, a2, "salt");
    var h2, y2 = 0 | r._crypto_pwhash_scryptsalsa208sha256_saltbytes();
    a2.length !== y2 && L(c2, "invalid salt length"), h2 = K(a2), c2.push(h2), U(c2, _2, "opsLimit"), ("number" != typeof _2 || (0 | _2) !== _2 || _2 < 0) && L(c2, "opsLimit must be an unsigned integer"), U(c2, n2, "memLimit"), ("number" != typeof n2 || (0 | n2) !== n2 || n2 < 0) && L(c2, "memLimit must be an unsigned integer");
    var i2 = new B(0 | e), l2 = i2.address;
    if (c2.push(l2), !(0 | r._crypto_pwhash_scryptsalsa208sha256(l2, e, 0, p2, o2, 0, h2, _2, 0, n2))) {
      var u2 = S(i2, s2);
      return M(c2), u2;
    }
    N(c2, "invalid usage");
  }
  function Rt(e, t2, a2, _2, n2, s2, c2) {
    var p2 = [];
    Y(c2);
    var o2 = K(e = O(p2, e, "password")), h2 = e.length;
    p2.push(o2);
    var y2 = K(t2 = O(p2, t2, "salt")), i2 = t2.length;
    p2.push(y2), U(p2, a2, "opsLimit"), ("number" != typeof a2 || (0 | a2) !== a2 || a2 < 0) && L(p2, "opsLimit must be an unsigned integer"), U(p2, _2, "r"), ("number" != typeof _2 || (0 | _2) !== _2 || _2 < 0) && L(p2, "r must be an unsigned integer"), U(p2, n2, "p"), ("number" != typeof n2 || (0 | n2) !== n2 || n2 < 0) && L(p2, "p must be an unsigned integer"), U(p2, s2, "keyLength"), ("number" != typeof s2 || (0 | s2) !== s2 || s2 < 0) && L(p2, "keyLength must be an unsigned integer");
    var l2 = new B(0 | s2), u2 = l2.address;
    if (p2.push(u2), !(0 | r._crypto_pwhash_scryptsalsa208sha256_ll(o2, h2, y2, i2, a2, 0, _2, n2, u2, s2))) {
      var d2 = S(l2, c2);
      return M(p2), d2;
    }
    N(p2, "invalid usage");
  }
  function Pt(e, t2, a2, _2) {
    var n2 = [];
    Y(_2);
    var s2 = K(e = O(n2, e, "password")), c2 = e.length;
    n2.push(s2), U(n2, t2, "opsLimit"), ("number" != typeof t2 || (0 | t2) !== t2 || t2 < 0) && L(n2, "opsLimit must be an unsigned integer"), U(n2, a2, "memLimit"), ("number" != typeof a2 || (0 | a2) !== a2 || a2 < 0) && L(n2, "memLimit must be an unsigned integer");
    var p2 = new B(0 | r._crypto_pwhash_scryptsalsa208sha256_strbytes()).address;
    if (n2.push(p2), !(0 | r._crypto_pwhash_scryptsalsa208sha256_str(p2, s2, c2, 0, t2, 0, a2))) {
      var o2 = r.UTF8ToString(p2);
      return M(n2), o2;
    }
    N(n2, "invalid usage");
  }
  function Xt(e, t2, a2) {
    var _2 = [];
    Y(a2), "string" != typeof e && L(_2, "hashed_password must be a string");
    var n2 = K(e = v(e + "\0"));
    e.length, _2.push(n2);
    var s2 = K(t2 = O(_2, t2, "password")), c2 = t2.length;
    _2.push(s2);
    var p2 = !(0 | r._crypto_pwhash_scryptsalsa208sha256_str_verify(n2, s2, c2, 0));
    return M(_2), p2;
  }
  function Dt(e, t2, a2, _2) {
    var n2 = [];
    Y(_2);
    var s2 = K(e = O(n2, e, "password")), c2 = e.length;
    n2.push(s2), U(n2, t2, "opsLimit"), ("number" != typeof t2 || (0 | t2) !== t2 || t2 < 0) && L(n2, "opsLimit must be an unsigned integer"), U(n2, a2, "memLimit"), ("number" != typeof a2 || (0 | a2) !== a2 || a2 < 0) && L(n2, "memLimit must be an unsigned integer");
    var p2 = new B(0 | r._crypto_pwhash_strbytes()).address;
    if (n2.push(p2), !(0 | r._crypto_pwhash_str(p2, s2, c2, 0, t2, 0, a2))) {
      var o2 = r.UTF8ToString(p2);
      return M(n2), o2;
    }
    N(n2, "invalid usage");
  }
  function Gt(e, t2, a2, _2) {
    var n2 = [];
    Y(_2), "string" != typeof e && L(n2, "hashed_password must be a string");
    var s2 = K(e = v(e + "\0"));
    e.length, n2.push(s2), U(n2, t2, "opsLimit"), ("number" != typeof t2 || (0 | t2) !== t2 || t2 < 0) && L(n2, "opsLimit must be an unsigned integer"), U(n2, a2, "memLimit"), ("number" != typeof a2 || (0 | a2) !== a2 || a2 < 0) && L(n2, "memLimit must be an unsigned integer");
    var c2 = !!(0 | r._crypto_pwhash_str_needs_rehash(s2, t2, 0, a2));
    return M(n2), c2;
  }
  function Ft(e, t2, a2) {
    var _2 = [];
    Y(a2), "string" != typeof e && L(_2, "hashed_password must be a string");
    var n2 = K(e = v(e + "\0"));
    e.length, _2.push(n2);
    var s2 = K(t2 = O(_2, t2, "password")), c2 = t2.length;
    _2.push(s2);
    var p2 = !(0 | r._crypto_pwhash_str_verify(n2, s2, c2, 0));
    return M(_2), p2;
  }
  function Vt(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "privateKey");
    var n2, s2 = 0 | r._crypto_scalarmult_scalarbytes();
    e.length !== s2 && L(_2, "invalid privateKey length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "publicKey");
    var c2, p2 = 0 | r._crypto_scalarmult_bytes();
    t2.length !== p2 && L(_2, "invalid publicKey length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_scalarmult_bytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_scalarmult(h2, n2, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "weak public key");
  }
  function qt(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "privateKey");
    var _2, n2 = 0 | r._crypto_scalarmult_scalarbytes();
    e.length !== n2 && L(a2, "invalid privateKey length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_scalarmult_bytes()), c2 = s2.address;
    if (a2.push(c2), !(0 | r._crypto_scalarmult_base(c2, _2))) {
      var p2 = S(s2, t2);
      return M(a2), p2;
    }
    N(a2, "unknown error");
  }
  function Ht(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "n");
    var n2, s2 = 0 | r._crypto_scalarmult_ed25519_scalarbytes();
    e.length !== s2 && L(_2, "invalid n length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "p");
    var c2, p2 = 0 | r._crypto_scalarmult_ed25519_bytes();
    t2.length !== p2 && L(_2, "invalid p length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_scalarmult_ed25519_bytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_scalarmult_ed25519(h2, n2, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "invalid point or scalar is 0");
  }
  function zt(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "scalar");
    var _2, n2 = 0 | r._crypto_scalarmult_ed25519_scalarbytes();
    e.length !== n2 && L(a2, "invalid scalar length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_scalarmult_ed25519_bytes()), c2 = s2.address;
    if (a2.push(c2), !(0 | r._crypto_scalarmult_ed25519_base(c2, _2))) {
      var p2 = S(s2, t2);
      return M(a2), p2;
    }
    N(a2, "scalar is 0");
  }
  function Wt(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "scalar");
    var _2, n2 = 0 | r._crypto_scalarmult_ed25519_scalarbytes();
    e.length !== n2 && L(a2, "invalid scalar length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_scalarmult_ed25519_bytes()), c2 = s2.address;
    if (a2.push(c2), !(0 | r._crypto_scalarmult_ed25519_base_noclamp(c2, _2))) {
      var p2 = S(s2, t2);
      return M(a2), p2;
    }
    N(a2, "scalar is 0");
  }
  function jt(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "n");
    var n2, s2 = 0 | r._crypto_scalarmult_ed25519_scalarbytes();
    e.length !== s2 && L(_2, "invalid n length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "p");
    var c2, p2 = 0 | r._crypto_scalarmult_ed25519_bytes();
    t2.length !== p2 && L(_2, "invalid p length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_scalarmult_ed25519_bytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_scalarmult_ed25519_noclamp(h2, n2, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "invalid point or scalar is 0");
  }
  function Jt(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "scalar");
    var n2, s2 = 0 | r._crypto_scalarmult_ristretto255_scalarbytes();
    e.length !== s2 && L(_2, "invalid scalar length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "element");
    var c2, p2 = 0 | r._crypto_scalarmult_ristretto255_bytes();
    t2.length !== p2 && L(_2, "invalid element length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_scalarmult_ristretto255_bytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_scalarmult_ristretto255(h2, n2, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "result is identity element");
  }
  function Qt(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "scalar");
    var _2, n2 = 0 | r._crypto_core_ristretto255_scalarbytes();
    e.length !== n2 && L(a2, "invalid scalar length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_core_ristretto255_bytes()), c2 = s2.address;
    if (a2.push(c2), !(0 | r._crypto_scalarmult_ristretto255_base(c2, _2))) {
      var p2 = S(s2, t2);
      return M(a2), p2;
    }
    N(a2, "scalar is 0");
  }
  function Zt(e, t2, a2, _2) {
    var n2 = [];
    Y(_2);
    var s2 = K(e = O(n2, e, "message")), c2 = e.length;
    n2.push(s2), t2 = O(n2, t2, "nonce");
    var p2, o2 = 0 | r._crypto_secretbox_noncebytes();
    t2.length !== o2 && L(n2, "invalid nonce length"), p2 = K(t2), n2.push(p2), a2 = O(n2, a2, "key");
    var h2, y2 = 0 | r._crypto_secretbox_keybytes();
    a2.length !== y2 && L(n2, "invalid key length"), h2 = K(a2), n2.push(h2);
    var i2 = new B(0 | c2), l2 = i2.address;
    n2.push(l2);
    var u2 = new B(0 | r._crypto_secretbox_macbytes()), d2 = u2.address;
    if (n2.push(d2), !(0 | r._crypto_secretbox_detached(l2, d2, s2, c2, 0, p2, h2))) {
      var v2 = S({ mac: u2, cipher: i2 }, _2);
      return M(n2), v2;
    }
    N(n2, "invalid usage");
  }
  function $t(e, t2, a2, _2) {
    var n2 = [];
    Y(_2);
    var s2 = K(e = O(n2, e, "message")), c2 = e.length;
    n2.push(s2), t2 = O(n2, t2, "nonce");
    var p2, o2 = 0 | r._crypto_secretbox_noncebytes();
    t2.length !== o2 && L(n2, "invalid nonce length"), p2 = K(t2), n2.push(p2), a2 = O(n2, a2, "key");
    var h2, y2 = 0 | r._crypto_secretbox_keybytes();
    a2.length !== y2 && L(n2, "invalid key length"), h2 = K(a2), n2.push(h2);
    var i2 = new B(c2 + r._crypto_secretbox_macbytes() | 0), l2 = i2.address;
    if (n2.push(l2), !(0 | r._crypto_secretbox_easy(l2, s2, c2, 0, p2, h2))) {
      var u2 = S(i2, _2);
      return M(n2), u2;
    }
    N(n2, "invalid usage");
  }
  function ea(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_secretbox_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_secretbox_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function ra(e, t2, a2, _2, n2) {
    var s2 = [];
    Y(n2);
    var c2 = K(e = O(s2, e, "ciphertext")), p2 = e.length;
    s2.push(c2), t2 = O(s2, t2, "mac");
    var o2, h2 = 0 | r._crypto_secretbox_macbytes();
    t2.length !== h2 && L(s2, "invalid mac length"), o2 = K(t2), s2.push(o2), a2 = O(s2, a2, "nonce");
    var y2, i2 = 0 | r._crypto_secretbox_noncebytes();
    a2.length !== i2 && L(s2, "invalid nonce length"), y2 = K(a2), s2.push(y2), _2 = O(s2, _2, "key");
    var l2, u2 = 0 | r._crypto_secretbox_keybytes();
    _2.length !== u2 && L(s2, "invalid key length"), l2 = K(_2), s2.push(l2);
    var d2 = new B(0 | p2), v2 = d2.address;
    if (s2.push(v2), !(0 | r._crypto_secretbox_open_detached(v2, c2, o2, p2, 0, y2, l2))) {
      var g2 = S(d2, n2);
      return M(s2), g2;
    }
    N(s2, "wrong secret key for the given ciphertext");
  }
  function ta(e, t2, a2, _2) {
    var n2 = [];
    Y(_2), e = O(n2, e, "ciphertext");
    var s2, c2 = r._crypto_secretbox_macbytes(), p2 = e.length;
    p2 < c2 && L(n2, "ciphertext is too short"), s2 = K(e), n2.push(s2), t2 = O(n2, t2, "nonce");
    var o2, h2 = 0 | r._crypto_secretbox_noncebytes();
    t2.length !== h2 && L(n2, "invalid nonce length"), o2 = K(t2), n2.push(o2), a2 = O(n2, a2, "key");
    var y2, i2 = 0 | r._crypto_secretbox_keybytes();
    a2.length !== i2 && L(n2, "invalid key length"), y2 = K(a2), n2.push(y2);
    var l2 = new B(p2 - r._crypto_secretbox_macbytes() | 0), u2 = l2.address;
    if (n2.push(u2), !(0 | r._crypto_secretbox_open_easy(u2, s2, p2, 0, o2, y2))) {
      var d2 = S(l2, _2);
      return M(n2), d2;
    }
    N(n2, "wrong secret key for the given ciphertext");
  }
  function aa(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "header");
    var n2, s2 = 0 | r._crypto_secretstream_xchacha20poly1305_headerbytes();
    e.length !== s2 && L(_2, "invalid header length"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "key");
    var c2, p2 = 0 | r._crypto_secretstream_xchacha20poly1305_keybytes();
    t2.length !== p2 && L(_2, "invalid key length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(52).address;
    if (!(0 | r._crypto_secretstream_xchacha20poly1305_init_pull(o2, n2, c2))) {
      var h2 = o2;
      return M(_2), h2;
    }
    N(_2, "invalid usage");
  }
  function _a(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "key");
    var _2, n2 = 0 | r._crypto_secretstream_xchacha20poly1305_keybytes();
    e.length !== n2 && L(a2, "invalid key length"), _2 = K(e), a2.push(_2);
    var s2 = new B(52).address, c2 = new B(0 | r._crypto_secretstream_xchacha20poly1305_headerbytes()), p2 = c2.address;
    if (a2.push(p2), !(0 | r._crypto_secretstream_xchacha20poly1305_init_push(s2, p2, _2))) {
      var o2 = { state: s2, header: S(c2, t2) };
      return M(a2), o2;
    }
    N(a2, "invalid usage");
  }
  function na(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_secretstream_xchacha20poly1305_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_secretstream_xchacha20poly1305_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function sa(e, t2, a2, _2) {
    var n2 = [];
    Y(_2), U(n2, e, "state_address"), t2 = O(n2, t2, "cipher");
    var s2, c2 = r._crypto_secretstream_xchacha20poly1305_abytes(), p2 = t2.length;
    p2 < c2 && L(n2, "cipher is too short"), s2 = K(t2), n2.push(s2);
    var o2 = null, h2 = 0;
    null != a2 && (o2 = K(a2 = O(n2, a2, "ad")), h2 = a2.length, n2.push(o2));
    var y2 = new B(p2 - r._crypto_secretstream_xchacha20poly1305_abytes() | 0), i2 = y2.address;
    n2.push(i2);
    var l2, u2 = (l2 = A2(1), n2.push(l2), (u2 = 0 === r._crypto_secretstream_xchacha20poly1305_pull(e, i2, 0, l2, s2, p2, 0, o2, h2) && { tag: r.HEAPU8[l2], message: y2 }) && { message: S(u2.message, _2), tag: u2.tag });
    return M(n2), u2;
  }
  function ca(e, t2, a2, _2, n2) {
    var s2 = [];
    Y(n2), U(s2, e, "state_address");
    var c2 = K(t2 = O(s2, t2, "message_chunk")), p2 = t2.length;
    s2.push(c2);
    var o2 = null, h2 = 0;
    null != a2 && (o2 = K(a2 = O(s2, a2, "ad")), h2 = a2.length, s2.push(o2)), U(s2, _2, "tag"), ("number" != typeof _2 || (0 | _2) !== _2 || _2 < 0) && L(s2, "tag must be an unsigned integer");
    var y2 = new B(p2 + r._crypto_secretstream_xchacha20poly1305_abytes() | 0), i2 = y2.address;
    if (s2.push(i2), !(0 | r._crypto_secretstream_xchacha20poly1305_push(e, i2, 0, c2, p2, 0, o2, h2, 0, _2))) {
      var l2 = S(y2, n2);
      return M(s2), l2;
    }
    N(s2, "invalid usage");
  }
  function pa(e, t2) {
    var a2 = [];
    return Y(t2), U(a2, e, "state_address"), r._crypto_secretstream_xchacha20poly1305_rekey(e), M(a2), true;
  }
  function oa(e, t2, a2) {
    var _2 = [];
    Y(a2);
    var n2 = K(e = O(_2, e, "message")), s2 = e.length;
    _2.push(n2), t2 = O(_2, t2, "key");
    var c2, p2 = 0 | r._crypto_shorthash_keybytes();
    t2.length !== p2 && L(_2, "invalid key length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_shorthash_bytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_shorthash(h2, n2, s2, 0, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "invalid usage");
  }
  function ha(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_shorthash_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_shorthash_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function ya(e, t2, a2) {
    var _2 = [];
    Y(a2);
    var n2 = K(e = O(_2, e, "message")), s2 = e.length;
    _2.push(n2), t2 = O(_2, t2, "key");
    var c2, p2 = 0 | r._crypto_shorthash_siphashx24_keybytes();
    t2.length !== p2 && L(_2, "invalid key length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_shorthash_siphashx24_bytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_shorthash_siphashx24(h2, n2, s2, 0, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "invalid usage");
  }
  function ia(e, t2, a2) {
    var _2 = [];
    Y(a2);
    var n2 = K(e = O(_2, e, "message")), s2 = e.length;
    _2.push(n2), t2 = O(_2, t2, "privateKey");
    var c2, p2 = 0 | r._crypto_sign_secretkeybytes();
    t2.length !== p2 && L(_2, "invalid privateKey length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(e.length + r._crypto_sign_bytes() | 0), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_sign(h2, null, n2, s2, 0, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "invalid usage");
  }
  function la(e, t2, a2) {
    var _2 = [];
    Y(a2);
    var n2 = K(e = O(_2, e, "message")), s2 = e.length;
    _2.push(n2), t2 = O(_2, t2, "privateKey");
    var c2, p2 = 0 | r._crypto_sign_secretkeybytes();
    t2.length !== p2 && L(_2, "invalid privateKey length"), c2 = K(t2), _2.push(c2);
    var o2 = new B(0 | r._crypto_sign_bytes()), h2 = o2.address;
    if (_2.push(h2), !(0 | r._crypto_sign_detached(h2, null, n2, s2, 0, c2))) {
      var y2 = S(o2, a2);
      return M(_2), y2;
    }
    N(_2, "invalid usage");
  }
  function ua(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "edPk");
    var _2, n2 = 0 | r._crypto_sign_publickeybytes();
    e.length !== n2 && L(a2, "invalid edPk length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_scalarmult_scalarbytes()), c2 = s2.address;
    if (a2.push(c2), !(0 | r._crypto_sign_ed25519_pk_to_curve25519(c2, _2))) {
      var p2 = S(s2, t2);
      return M(a2), p2;
    }
    N(a2, "invalid key");
  }
  function da(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "edSk");
    var _2, n2 = 0 | r._crypto_sign_secretkeybytes();
    e.length !== n2 && L(a2, "invalid edSk length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_scalarmult_scalarbytes()), c2 = s2.address;
    if (a2.push(c2), !(0 | r._crypto_sign_ed25519_sk_to_curve25519(c2, _2))) {
      var p2 = S(s2, t2);
      return M(a2), p2;
    }
    N(a2, "invalid key");
  }
  function va(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "privateKey");
    var _2, n2 = 0 | r._crypto_sign_secretkeybytes();
    e.length !== n2 && L(a2, "invalid privateKey length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_sign_publickeybytes()), c2 = s2.address;
    if (a2.push(c2), !(0 | r._crypto_sign_ed25519_sk_to_pk(c2, _2))) {
      var p2 = S(s2, t2);
      return M(a2), p2;
    }
    N(a2, "invalid key");
  }
  function ga(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "privateKey");
    var _2, n2 = 0 | r._crypto_sign_secretkeybytes();
    e.length !== n2 && L(a2, "invalid privateKey length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_sign_seedbytes()), c2 = s2.address;
    if (a2.push(c2), !(0 | r._crypto_sign_ed25519_sk_to_seed(c2, _2))) {
      var p2 = S(s2, t2);
      return M(a2), p2;
    }
    N(a2, "invalid key");
  }
  function ba(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "state_address"), t2 = O(_2, t2, "privateKey");
    var n2, s2 = 0 | r._crypto_sign_secretkeybytes();
    t2.length !== s2 && L(_2, "invalid privateKey length"), n2 = K(t2), _2.push(n2);
    var c2 = new B(0 | r._crypto_sign_bytes()), p2 = c2.address;
    if (_2.push(p2), !(0 | r._crypto_sign_final_create(e, p2, null, n2))) {
      var o2 = (r._free(e), S(c2, a2));
      return M(_2), o2;
    }
    N(_2, "invalid usage");
  }
  function fa(e, t2, a2, _2) {
    var n2 = [];
    Y(_2), U(n2, e, "state_address"), t2 = O(n2, t2, "signature");
    var s2, c2 = 0 | r._crypto_sign_bytes();
    t2.length !== c2 && L(n2, "invalid signature length"), s2 = K(t2), n2.push(s2), a2 = O(n2, a2, "publicKey");
    var p2, o2 = 0 | r._crypto_sign_publickeybytes();
    a2.length !== o2 && L(n2, "invalid publicKey length"), p2 = K(a2), n2.push(p2);
    var h2 = !(0 | r._crypto_sign_final_verify(e, s2, p2));
    return M(n2), h2;
  }
  function ma(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(208).address;
    if (!(0 | r._crypto_sign_init(a2))) {
      var _2 = a2;
      return M(t2), _2;
    }
    N(t2, "internal error");
  }
  function ka(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_sign_publickeybytes()), _2 = a2.address;
    t2.push(_2);
    var n2 = new B(0 | r._crypto_sign_secretkeybytes()), s2 = n2.address;
    if (t2.push(s2), !(0 | r._crypto_sign_keypair(_2, s2))) {
      var c2 = { publicKey: S(a2, e), privateKey: S(n2, e), keyType: "ed25519" };
      return M(t2), c2;
    }
    N(t2, "internal error");
  }
  function xa(e, t2, a2) {
    var _2 = [];
    Y(a2), e = O(_2, e, "signedMessage");
    var n2, s2 = r._crypto_sign_bytes(), c2 = e.length;
    c2 < s2 && L(_2, "signedMessage is too short"), n2 = K(e), _2.push(n2), t2 = O(_2, t2, "publicKey");
    var p2, o2 = 0 | r._crypto_sign_publickeybytes();
    t2.length !== o2 && L(_2, "invalid publicKey length"), p2 = K(t2), _2.push(p2);
    var h2 = new B(c2 - r._crypto_sign_bytes() | 0), y2 = h2.address;
    if (_2.push(y2), !(0 | r._crypto_sign_open(y2, null, n2, c2, 0, p2))) {
      var i2 = S(h2, a2);
      return M(_2), i2;
    }
    N(_2, "incorrect signature for the given public key");
  }
  function Ea(e, t2) {
    var a2 = [];
    Y(t2), e = O(a2, e, "seed");
    var _2, n2 = 0 | r._crypto_sign_seedbytes();
    e.length !== n2 && L(a2, "invalid seed length"), _2 = K(e), a2.push(_2);
    var s2 = new B(0 | r._crypto_sign_publickeybytes()), c2 = s2.address;
    a2.push(c2);
    var p2 = new B(0 | r._crypto_sign_secretkeybytes()), o2 = p2.address;
    if (a2.push(o2), !(0 | r._crypto_sign_seed_keypair(c2, o2, _2))) {
      var h2 = { publicKey: S(s2, t2), privateKey: S(p2, t2), keyType: "ed25519" };
      return M(a2), h2;
    }
    N(a2, "invalid usage");
  }
  function Ta(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "state_address");
    var n2 = K(t2 = O(_2, t2, "message_chunk")), s2 = t2.length;
    _2.push(n2), 0 | r._crypto_sign_update(e, n2, s2, 0) && N(_2, "invalid usage"), M(_2);
  }
  function Sa(e, t2, a2) {
    var _2 = [];
    e = O(_2, e, "signature");
    var n2, s2 = 0 | r._crypto_sign_bytes();
    e.length !== s2 && L(_2, "invalid signature length"), n2 = K(e), _2.push(n2);
    var c2 = K(t2 = O(_2, t2, "message")), p2 = t2.length;
    _2.push(c2), a2 = O(_2, a2, "publicKey");
    var o2, h2 = 0 | r._crypto_sign_publickeybytes();
    a2.length !== h2 && L(_2, "invalid publicKey length"), o2 = K(a2), _2.push(o2);
    var y2 = !(0 | r._crypto_sign_verify_detached(n2, c2, p2, 0, o2));
    return M(_2), y2;
  }
  function wa(e, t2, a2, _2) {
    var n2 = [];
    Y(_2), U(n2, e, "outLength"), ("number" != typeof e || (0 | e) !== e || e < 0) && L(n2, "outLength must be an unsigned integer"), t2 = O(n2, t2, "key");
    var s2, c2 = 0 | r._crypto_stream_chacha20_keybytes();
    t2.length !== c2 && L(n2, "invalid key length"), s2 = K(t2), n2.push(s2), a2 = O(n2, a2, "nonce");
    var p2, o2 = 0 | r._crypto_stream_chacha20_noncebytes();
    a2.length !== o2 && L(n2, "invalid nonce length"), p2 = K(a2), n2.push(p2);
    var h2 = new B(0 | e), y2 = h2.address;
    n2.push(y2), r._crypto_stream_chacha20(y2, e, 0, p2, s2);
    var i2 = S(h2, _2);
    return M(n2), i2;
  }
  function Ya(e, t2, a2, _2) {
    var n2 = [];
    Y(_2);
    var s2 = K(e = O(n2, e, "input_message")), c2 = e.length;
    n2.push(s2), t2 = O(n2, t2, "nonce");
    var p2, o2 = 0 | r._crypto_stream_chacha20_ietf_noncebytes();
    t2.length !== o2 && L(n2, "invalid nonce length"), p2 = K(t2), n2.push(p2), a2 = O(n2, a2, "key");
    var h2, y2 = 0 | r._crypto_stream_chacha20_ietf_keybytes();
    a2.length !== y2 && L(n2, "invalid key length"), h2 = K(a2), n2.push(h2);
    var i2 = new B(0 | c2), l2 = i2.address;
    if (n2.push(l2), 0 === r._crypto_stream_chacha20_ietf_xor(l2, s2, c2, 0, p2, h2)) {
      var u2 = S(i2, _2);
      return M(n2), u2;
    }
    N(n2, "invalid usage");
  }
  function Ba(e, t2, a2, _2, n2) {
    var s2 = [];
    Y(n2);
    var c2 = K(e = O(s2, e, "input_message")), p2 = e.length;
    s2.push(c2), t2 = O(s2, t2, "nonce");
    var o2, h2 = 0 | r._crypto_stream_chacha20_ietf_noncebytes();
    t2.length !== h2 && L(s2, "invalid nonce length"), o2 = K(t2), s2.push(o2), U(s2, a2, "nonce_increment"), ("number" != typeof a2 || (0 | a2) !== a2 || a2 < 0) && L(s2, "nonce_increment must be an unsigned integer"), _2 = O(s2, _2, "key");
    var y2, i2 = 0 | r._crypto_stream_chacha20_ietf_keybytes();
    _2.length !== i2 && L(s2, "invalid key length"), y2 = K(_2), s2.push(y2);
    var l2 = new B(0 | p2), u2 = l2.address;
    if (s2.push(u2), 0 === r._crypto_stream_chacha20_ietf_xor_ic(u2, c2, p2, 0, o2, a2, y2)) {
      var d2 = S(l2, n2);
      return M(s2), d2;
    }
    N(s2, "invalid usage");
  }
  function Ka(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_stream_chacha20_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_stream_chacha20_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function Aa(e, t2, a2, _2) {
    var n2 = [];
    Y(_2);
    var s2 = K(e = O(n2, e, "input_message")), c2 = e.length;
    n2.push(s2), t2 = O(n2, t2, "nonce");
    var p2, o2 = 0 | r._crypto_stream_chacha20_noncebytes();
    t2.length !== o2 && L(n2, "invalid nonce length"), p2 = K(t2), n2.push(p2), a2 = O(n2, a2, "key");
    var h2, y2 = 0 | r._crypto_stream_chacha20_keybytes();
    a2.length !== y2 && L(n2, "invalid key length"), h2 = K(a2), n2.push(h2);
    var i2 = new B(0 | c2), l2 = i2.address;
    if (n2.push(l2), 0 === r._crypto_stream_chacha20_xor(l2, s2, c2, 0, p2, h2)) {
      var u2 = S(i2, _2);
      return M(n2), u2;
    }
    N(n2, "invalid usage");
  }
  function Ia(e, t2, a2, _2, n2) {
    var s2 = [];
    Y(n2);
    var c2 = K(e = O(s2, e, "input_message")), p2 = e.length;
    s2.push(c2), t2 = O(s2, t2, "nonce");
    var o2, h2 = 0 | r._crypto_stream_chacha20_noncebytes();
    t2.length !== h2 && L(s2, "invalid nonce length"), o2 = K(t2), s2.push(o2), U(s2, a2, "nonce_increment"), ("number" != typeof a2 || (0 | a2) !== a2 || a2 < 0) && L(s2, "nonce_increment must be an unsigned integer"), _2 = O(s2, _2, "key");
    var y2, i2 = 0 | r._crypto_stream_chacha20_keybytes();
    _2.length !== i2 && L(s2, "invalid key length"), y2 = K(_2), s2.push(y2);
    var l2 = new B(0 | p2), u2 = l2.address;
    if (s2.push(u2), 0 === r._crypto_stream_chacha20_xor_ic(u2, c2, p2, 0, o2, a2, 0, y2)) {
      var d2 = S(l2, n2);
      return M(s2), d2;
    }
    N(s2, "invalid usage");
  }
  function Ma(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_stream_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_stream_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function Na(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(0 | r._crypto_stream_xchacha20_keybytes()), _2 = a2.address;
    t2.push(_2), r._crypto_stream_xchacha20_keygen(_2);
    var n2 = S(a2, e);
    return M(t2), n2;
  }
  function La(e, t2, a2, _2) {
    var n2 = [];
    Y(_2);
    var s2 = K(e = O(n2, e, "input_message")), c2 = e.length;
    n2.push(s2), t2 = O(n2, t2, "nonce");
    var p2, o2 = 0 | r._crypto_stream_xchacha20_noncebytes();
    t2.length !== o2 && L(n2, "invalid nonce length"), p2 = K(t2), n2.push(p2), a2 = O(n2, a2, "key");
    var h2, y2 = 0 | r._crypto_stream_xchacha20_keybytes();
    a2.length !== y2 && L(n2, "invalid key length"), h2 = K(a2), n2.push(h2);
    var i2 = new B(0 | c2), l2 = i2.address;
    if (n2.push(l2), 0 === r._crypto_stream_xchacha20_xor(l2, s2, c2, 0, p2, h2)) {
      var u2 = S(i2, _2);
      return M(n2), u2;
    }
    N(n2, "invalid usage");
  }
  function Ua(e, t2, a2, _2, n2) {
    var s2 = [];
    Y(n2);
    var c2 = K(e = O(s2, e, "input_message")), p2 = e.length;
    s2.push(c2), t2 = O(s2, t2, "nonce");
    var o2, h2 = 0 | r._crypto_stream_xchacha20_noncebytes();
    t2.length !== h2 && L(s2, "invalid nonce length"), o2 = K(t2), s2.push(o2), U(s2, a2, "nonce_increment"), ("number" != typeof a2 || (0 | a2) !== a2 || a2 < 0) && L(s2, "nonce_increment must be an unsigned integer"), _2 = O(s2, _2, "key");
    var y2, i2 = 0 | r._crypto_stream_xchacha20_keybytes();
    _2.length !== i2 && L(s2, "invalid key length"), y2 = K(_2), s2.push(y2);
    var l2 = new B(0 | p2), u2 = l2.address;
    if (s2.push(u2), 0 === r._crypto_stream_xchacha20_xor_ic(u2, c2, p2, 0, o2, a2, 0, y2)) {
      var d2 = S(l2, n2);
      return M(s2), d2;
    }
    N(s2, "invalid usage");
  }
  function Oa(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "out_length"), ("number" != typeof e || (0 | e) !== e || e < 0) && L(_2, "out_length must be an unsigned integer");
    var n2 = K(t2 = O(_2, t2, "message")), s2 = t2.length;
    _2.push(n2);
    var c2 = new B(e |= 0), p2 = c2.address;
    if (_2.push(p2), !(0 | r._crypto_xof_shake128(p2, e, n2, s2, 0))) {
      var o2 = S(c2, a2);
      return M(_2), o2;
    }
    N(_2, "invalid usage");
  }
  function Ca(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(256).address;
    if (!(0 | r._crypto_xof_shake128_init(a2))) {
      var _2 = a2;
      return M(t2), _2;
    }
    N(t2, "invalid usage");
  }
  function Ra(e, t2) {
    var a2 = [];
    Y(t2), U(a2, e, "domain"), ("number" != typeof e || (0 | e) !== e || e < 0) && L(a2, "domain must be an unsigned integer");
    var _2 = new B(256).address;
    if (!(0 | r._crypto_xof_shake128_init_with_domain(_2, e))) {
      var n2 = _2;
      return M(a2), n2;
    }
    N(a2, "invalid usage");
  }
  function Pa(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "state_address"), U(_2, t2, "out_length"), ("number" != typeof t2 || (0 | t2) !== t2 || t2 < 0) && L(_2, "out_length must be an unsigned integer");
    var n2 = new B(t2 |= 0), s2 = n2.address;
    if (_2.push(s2), !(0 | r._crypto_xof_shake128_squeeze(e, s2, t2))) {
      var c2 = S(n2, a2);
      return M(_2), c2;
    }
    N(_2, "invalid usage");
  }
  function Xa(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "state_address");
    var n2 = K(t2 = O(_2, t2, "message_chunk")), s2 = t2.length;
    _2.push(n2), 0 | r._crypto_xof_shake128_update(e, n2, s2, 0) && N(_2, "invalid usage"), M(_2);
  }
  function Da(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "out_length"), ("number" != typeof e || (0 | e) !== e || e < 0) && L(_2, "out_length must be an unsigned integer");
    var n2 = K(t2 = O(_2, t2, "message")), s2 = t2.length;
    _2.push(n2);
    var c2 = new B(e |= 0), p2 = c2.address;
    if (_2.push(p2), !(0 | r._crypto_xof_shake256(p2, e, n2, s2, 0))) {
      var o2 = S(c2, a2);
      return M(_2), o2;
    }
    N(_2, "invalid usage");
  }
  function Ga(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(256).address;
    if (!(0 | r._crypto_xof_shake256_init(a2))) {
      var _2 = a2;
      return M(t2), _2;
    }
    N(t2, "invalid usage");
  }
  function Fa(e, t2) {
    var a2 = [];
    Y(t2), U(a2, e, "domain"), ("number" != typeof e || (0 | e) !== e || e < 0) && L(a2, "domain must be an unsigned integer");
    var _2 = new B(256).address;
    if (!(0 | r._crypto_xof_shake256_init_with_domain(_2, e))) {
      var n2 = _2;
      return M(a2), n2;
    }
    N(a2, "invalid usage");
  }
  function Va(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "state_address"), U(_2, t2, "out_length"), ("number" != typeof t2 || (0 | t2) !== t2 || t2 < 0) && L(_2, "out_length must be an unsigned integer");
    var n2 = new B(t2 |= 0), s2 = n2.address;
    if (_2.push(s2), !(0 | r._crypto_xof_shake256_squeeze(e, s2, t2))) {
      var c2 = S(n2, a2);
      return M(_2), c2;
    }
    N(_2, "invalid usage");
  }
  function qa(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "state_address");
    var n2 = K(t2 = O(_2, t2, "message_chunk")), s2 = t2.length;
    _2.push(n2), 0 | r._crypto_xof_shake256_update(e, n2, s2, 0) && N(_2, "invalid usage"), M(_2);
  }
  function Ha(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "out_length"), ("number" != typeof e || (0 | e) !== e || e < 0) && L(_2, "out_length must be an unsigned integer");
    var n2 = K(t2 = O(_2, t2, "message")), s2 = t2.length;
    _2.push(n2);
    var c2 = new B(e |= 0), p2 = c2.address;
    if (_2.push(p2), !(0 | r._crypto_xof_turboshake128(p2, e, n2, s2, 0))) {
      var o2 = S(c2, a2);
      return M(_2), o2;
    }
    N(_2, "invalid usage");
  }
  function za(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(256).address;
    if (!(0 | r._crypto_xof_turboshake128_init(a2))) {
      var _2 = a2;
      return M(t2), _2;
    }
    N(t2, "invalid usage");
  }
  function Wa(e, t2) {
    var a2 = [];
    Y(t2), U(a2, e, "domain"), ("number" != typeof e || (0 | e) !== e || e < 0) && L(a2, "domain must be an unsigned integer");
    var _2 = new B(256).address;
    if (!(0 | r._crypto_xof_turboshake128_init_with_domain(_2, e))) {
      var n2 = _2;
      return M(a2), n2;
    }
    N(a2, "invalid usage");
  }
  function ja(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "state_address"), U(_2, t2, "out_length"), ("number" != typeof t2 || (0 | t2) !== t2 || t2 < 0) && L(_2, "out_length must be an unsigned integer");
    var n2 = new B(t2 |= 0), s2 = n2.address;
    if (_2.push(s2), !(0 | r._crypto_xof_turboshake128_squeeze(e, s2, t2))) {
      var c2 = S(n2, a2);
      return M(_2), c2;
    }
    N(_2, "invalid usage");
  }
  function Ja(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "state_address");
    var n2 = K(t2 = O(_2, t2, "message_chunk")), s2 = t2.length;
    _2.push(n2), 0 | r._crypto_xof_turboshake128_update(e, n2, s2, 0) && N(_2, "invalid usage"), M(_2);
  }
  function Qa(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "out_length"), ("number" != typeof e || (0 | e) !== e || e < 0) && L(_2, "out_length must be an unsigned integer");
    var n2 = K(t2 = O(_2, t2, "message")), s2 = t2.length;
    _2.push(n2);
    var c2 = new B(e |= 0), p2 = c2.address;
    if (_2.push(p2), !(0 | r._crypto_xof_turboshake256(p2, e, n2, s2, 0))) {
      var o2 = S(c2, a2);
      return M(_2), o2;
    }
    N(_2, "invalid usage");
  }
  function Za(e) {
    var t2 = [];
    Y(e);
    var a2 = new B(256).address;
    if (!(0 | r._crypto_xof_turboshake256_init(a2))) {
      var _2 = a2;
      return M(t2), _2;
    }
    N(t2, "invalid usage");
  }
  function $a(e, t2) {
    var a2 = [];
    Y(t2), U(a2, e, "domain"), ("number" != typeof e || (0 | e) !== e || e < 0) && L(a2, "domain must be an unsigned integer");
    var _2 = new B(256).address;
    if (!(0 | r._crypto_xof_turboshake256_init_with_domain(_2, e))) {
      var n2 = _2;
      return M(a2), n2;
    }
    N(a2, "invalid usage");
  }
  function e_(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "state_address"), U(_2, t2, "out_length"), ("number" != typeof t2 || (0 | t2) !== t2 || t2 < 0) && L(_2, "out_length must be an unsigned integer");
    var n2 = new B(t2 |= 0), s2 = n2.address;
    if (_2.push(s2), !(0 | r._crypto_xof_turboshake256_squeeze(e, s2, t2))) {
      var c2 = S(n2, a2);
      return M(_2), c2;
    }
    N(_2, "invalid usage");
  }
  function r_(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "state_address");
    var n2 = K(t2 = O(_2, t2, "message_chunk")), s2 = t2.length;
    _2.push(n2), 0 | r._crypto_xof_turboshake256_update(e, n2, s2, 0) && N(_2, "invalid usage"), M(_2);
  }
  function t_(e, t2) {
    var a2 = [];
    Y(t2), U(a2, e, "length"), ("number" != typeof e || (0 | e) !== e || e < 0) && L(a2, "length must be an unsigned integer");
    var _2 = new B(0 | e), n2 = _2.address;
    a2.push(n2), r._randombytes_buf(n2, e);
    var s2 = S(_2, t2);
    return M(a2), s2;
  }
  function a_(e, t2, a2) {
    var _2 = [];
    Y(a2), U(_2, e, "length"), ("number" != typeof e || (0 | e) !== e || e < 0) && L(_2, "length must be an unsigned integer"), t2 = O(_2, t2, "seed");
    var n2, s2 = 0 | r._randombytes_seedbytes();
    t2.length !== s2 && L(_2, "invalid seed length"), n2 = K(t2), _2.push(n2);
    var c2 = new B(0 | e), p2 = c2.address;
    _2.push(p2), r._randombytes_buf_deterministic(p2, e, n2);
    var o2 = S(c2, a2);
    return M(_2), o2;
  }
  function __(e) {
    Y(e), r._randombytes_close();
  }
  function n_(e) {
    Y(e);
    var t2 = r._randombytes_random() >>> 0;
    return M([]), t2;
  }
  function s_(e, t2) {
    var a2 = [];
    Y(t2);
    for (var _2 = r._malloc(24), n2 = 0; n2 < 6; n2++) r.setValue(_2 + 4 * n2, r.Runtime.addFunction(e[["implementation_name", "random", "stir", "uniform", "buf", "close"][n2]]), "i32");
    0 | r._randombytes_set_implementation(_2) && N(a2, "unsupported implementation"), M(a2);
  }
  function c_(e) {
    Y(e), r._randombytes_stir();
  }
  function p_(e, t2) {
    var a2 = [];
    Y(t2), U(a2, e, "upper_bound"), ("number" != typeof e || (0 | e) !== e || e < 0) && L(a2, "upper_bound must be an unsigned integer");
    var _2 = r._randombytes_uniform(e) >>> 0;
    return M(a2), _2;
  }
  function o_(e) {
    var t2, a2 = [];
    16 !== (e = O(a2, e, "bin")).length && L(a2, "invalid bin length"), t2 = K(e), a2.push(t2);
    var _2 = new B(46).address;
    if (a2.push(_2), 0 !== r._sodium_bin2ip(_2, 46, t2)) {
      var n2 = r.UTF8ToString(_2);
      return M(a2), n2;
    }
    N(a2, "conversion failed");
  }
  function h_(e, t2) {
    var a2 = [];
    Y(t2), "string" != typeof e && L(a2, "ip must be a string");
    var _2 = K(e = v(e + "\0")), n2 = e.length - 1;
    a2.push(_2);
    var s2 = new B(16), c2 = s2.address;
    if (a2.push(c2), !(0 | r._sodium_ip2bin(c2, _2, n2))) {
      var p2 = S(s2, t2);
      return M(a2), p2;
    }
    N(a2, "invalid IP address");
  }
  function y_() {
    var e = r._sodium_version_string(), t2 = r.UTF8ToString(e);
    return M([]), t2;
  }
  B.prototype.to_Uint8Array = function() {
    var e = new Uint8Array(this.length);
    return e.set(r.HEAPU8.subarray(this.address, this.address + this.length)), e;
  }, t.add = o, t.base64_variants = m, t.compare = l, t.from_base64 = x, t.from_hex = b, t.from_string = v, t.increment = p, t.is_zero = h, t.memcmp = i, t.memzero = y, t.output_formats = T, t.pad = u, t.unpad = d, t.ready = s, t.symbols = c, t.to_base64 = E, t.to_hex = f, t.to_string = g;
  var libsodium_wrappers_default = t;

  // src/core.mjs
  var enc = new TextEncoder();
  var dec = new TextDecoder("utf-8", { fatal: true });
  var VERSION = 1;
  var LIMIT = 4096;
  var HEX64 = /^[0-9a-f]{64}$/;
  var OTHER = { i: "r", r: "i" };
  var MAX_FRAME_BYTES = 8192;
  var MAX_SESSION_MS = 15 * 60 * 1e3;
  var SESSION_STATES = Object.freeze(["HANDSHAKE", "CONFIRMING", "COMPARE", "WAIT_PEER", "READY", "CLOSED", "FAILED"]);
  function check(ok, code = "INVALID_FRAME") {
    if (!ok) throw new Error(code);
  }
  function exact(obj, keys) {
    check(obj && typeof obj === "object" && !Array.isArray(obj));
    check(Object.keys(obj).sort().join(",") === [...keys].sort().join(","));
  }
  function toHex(bytes) {
    return Array.from(bytes, (x2) => x2.toString(16).padStart(2, "0")).join("");
  }
  function encode64(bytes) {
    return libsodium_wrappers_default.to_base64(bytes, libsodium_wrappers_default.base64_variants.URLSAFE_NO_PADDING);
  }
  function decode64(value, max = MAX_FRAME_BYTES) {
    check(typeof value === "string" && value.length <= Math.ceil(max * 4 / 3) && /^[A-Za-z0-9_-]+$/.test(value));
    const bytes = libsodium_wrappers_default.from_base64(value, libsodium_wrappers_default.base64_variants.URLSAFE_NO_PADDING);
    check(bytes.length <= max && encode64(bytes) === value);
    return bytes;
  }
  async function digest(bytes) {
    return new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
  }
  async function derive(input, label, salt = new Uint8Array(32), size = 32) {
    const key = await crypto.subtle.importKey("raw", input, "HKDF", false, ["deriveBits"]);
    return new Uint8Array(await crypto.subtle.deriveBits({ name: "HKDF", hash: "SHA-256", salt, info: enc.encode(label) }, key, size * 8));
  }
  async function newInvite() {
    await libsodium_wrappers_default.ready;
    return encode64(crypto.getRandomValues(new Uint8Array(32)));
  }
  async function inviteMaterial(secret) {
    await libsodium_wrappers_default.ready;
    const bytes = decode64(secret, 32);
    check(bytes.length === 32, "INVALID_INVITE");
    try {
      return { room: toHex(await derive(bytes, "glassbox/v1/route", void 0, 16)), psk: await derive(bytes, "glassbox/v1/handshake-psk") };
    } finally {
      bytes.fill(0);
    }
  }
  function wipeNoise(noise) {
    if (!noise) return;
    for (const key of ["psk", "tx", "rx", "hash", "key", "digest", "chainingKey"]) {
      const value = noise[key];
      if (value instanceof Uint8Array) new Uint8Array(value.buffer).fill(0);
      noise[key] = null;
    }
    for (const key of ["s", "e"]) {
      if (noise[key]?.secretKey) noise[key].secretKey.fill(0);
      noise[key] = null;
    }
  }
  function pack(text) {
    check(typeof text === "string" && text.trim().length > 0, "EMPTY_MESSAGE");
    const bytes = enc.encode(text);
    check(bytes.length <= LIMIT, "MESSAGE_TOO_LARGE");
    const result = new Uint8Array(Math.ceil((bytes.length + 4) / 256) * 256);
    new DataView(result.buffer).setUint32(0, bytes.length, false);
    result.set(bytes, 4);
    bytes.fill(0);
    return result;
  }
  function unpack(bytes) {
    check(bytes.length >= 256 && bytes.length <= 4352 && bytes.length % 256 === 0, "INVALID_PADDING");
    const size = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(0, false);
    check(size > 0 && size <= LIMIT && size <= bytes.length - 4, "INVALID_PADDING");
    check(bytes.subarray(size + 4).every((x2) => x2 === 0), "INVALID_PADDING");
    const text = dec.decode(bytes.subarray(4, size + 4));
    check(text.trim().length > 0, "EMPTY_MESSAGE");
    return text;
  }
  var Session = class _Session {
    #role;
    #room;
    #noise;
    #phase = "HANDSHAKE";
    #step = 0;
    #sid = null;
    #fingerprint = null;
    #tx = {};
    #rx = {};
    #rxKeys = {};
    #localHeaders = null;
    #remoteHeaders = null;
    #confirmed = false;
    #compared = false;
    #peerCompared = false;
    #sent = { control: 0, chat: 0 };
    #received = { control: 0, chat: 0 };
    #out = [];
    #events = [];
    #born = performance.now();
    constructor(role, room, psk) {
      check(role === "i" || role === "r", "INVALID_ROLE");
      this.#role = role;
      this.#room = room;
      this.#noise = new import_noise_handshake.default("NNpsk0", role === "i", null, { psk });
      this.#noise.initialise(enc.encode(JSON.stringify(["glassbox", VERSION, "Noise_NNpsk0_25519_ChaChaPoly_BLAKE2b", room, "i=creator", "r=invitee"])));
    }
    static async create(secret, role) {
      const { room, psk } = await inviteMaterial(secret);
      return new _Session(role, room, psk);
    }
    get snapshot() {
      return Object.freeze({
        state: this.#phase,
        role: this.#role,
        room: this.#room,
        fingerprint: this.#fingerprint,
        compared: this.#compared,
        peerCompared: this.#peerCompared,
        canSend: this.#phase === "READY",
        sent: this.#sent.chat,
        received: this.#received.chat
      });
    }
    #alive() {
      check(!["FAILED", "CLOSED"].includes(this.#phase), "SESSION_CLOSED");
      check(performance.now() - this.#born < MAX_SESSION_MS, "SESSION_EXPIRED");
    }
    #state() {
      if (this.#confirmed) this.#phase = this.#compared ? this.#peerCompared ? "READY" : "WAIT_PEER" : "COMPARE";
    }
    #base(t2) {
      return { v: VERSION, t: t2, r: this.#room, from: this.#role };
    }
    #emit(frame) {
      check(enc.encode(JSON.stringify(frame)).length <= MAX_FRAME_BYTES);
      this.#out.push(frame);
    }
    drain() {
      const result = { frames: this.#out, events: this.#events, snapshot: this.snapshot };
      this.#out = [];
      this.#events = [];
      return result;
    }
    #payload() {
      return enc.encode(JSON.stringify({ role: this.#role, room: this.#room, nonce: encode64(crypto.getRandomValues(new Uint8Array(32))) }));
    }
    #validatePayload(bytes) {
      const value = JSON.parse(dec.decode(bytes));
      exact(value, ["role", "room", "nonce"]);
      check(value.role === OTHER[this.#role] && value.room === this.#room, "ROLE_BINDING_FAILED");
      check(decode64(value.nonce, 32).length === 32);
    }
    start() {
      try {
        this.#alive();
        check(this.#role === "i" && this.#step === 0, "HANDSHAKE_ORDER");
        this.#emit({ ...this.#base("noise"), n: 1, c: encode64(this.#noise.send(this.#payload())) });
        this.#step = 1;
        return this.drain();
      } catch (error) {
        this.abort();
        throw error;
      }
    }
    async #finishHandshake() {
      check(this.#noise.complete, "HANDSHAKE_INCOMPLETE");
      const hash = new Uint8Array(this.#noise.hash);
      this.#fingerprint = toHex(await digest(new Uint8Array([...enc.encode("glassbox/v1/fingerprint\0"), ...hash])));
      this.#sid = this.#fingerprint;
      this.#localHeaders = {};
      for (const kind of ["control", "chat"]) {
        const direction = `${this.#role}>${OTHER[this.#role]}`;
        const reverse = `${OTHER[this.#role]}>${this.#role}`;
        const sendKey = await derive(this.#noise.tx, `glassbox/v1/${kind}/${direction}`, hash);
        this.#rxKeys[kind] = await derive(this.#noise.rx, `glassbox/v1/${kind}/${reverse}`, hash);
        const stream = libsodium_wrappers_default.crypto_secretstream_xchacha20poly1305_init_push(sendKey);
        sendKey.fill(0);
        this.#tx[kind] = stream.state;
        this.#localHeaders[kind] = encode64(stream.header);
      }
      hash.fill(0);
      wipeNoise(this.#noise);
      this.#noise = null;
      this.#phase = "CONFIRMING";
      this.#emit({ ...this.#base("headers"), sid: this.#sid, ...this.#localHeaders });
    }
    #headerBinding() {
      return this.#role === "i" ? { i: this.#localHeaders, r: this.#remoteHeaders } : { i: this.#remoteHeaders, r: this.#localHeaders };
    }
    #aad(kind, from, seq) {
      return enc.encode(JSON.stringify(["glassbox", VERSION, this.#room, this.#sid, from, OTHER[from], kind, seq]));
    }
    #push(kind, bytes, final = false) {
      const seq = this.#sent[kind];
      check(seq < (kind === "chat" ? 100 : 16), "RECORD_LIMIT");
      const tag = final ? libsodium_wrappers_default.crypto_secretstream_xchacha20poly1305_TAG_FINAL : libsodium_wrappers_default.crypto_secretstream_xchacha20poly1305_TAG_REKEY;
      const cipher = libsodium_wrappers_default.crypto_secretstream_xchacha20poly1305_push(this.#tx[kind], bytes, this.#aad(kind, this.#role, seq), tag);
      this.#emit({ ...this.#base("record"), sid: this.#sid, kind, seq, c: encode64(cipher) });
      this.#sent[kind]++;
    }
    #control(data, final = false) {
      const bytes = enc.encode(JSON.stringify(data));
      try {
        this.#push("control", bytes, final);
      } finally {
        bytes.fill(0);
      }
    }
    async receive(frame) {
      try {
        this.#alive();
        check(enc.encode(JSON.stringify(frame)).length <= MAX_FRAME_BYTES);
        check(frame?.v === VERSION && frame.r === this.#room && frame.from === OTHER[this.#role], "CONTEXT_MISMATCH");
        if (frame.t === "noise") {
          exact(frame, ["v", "t", "r", "from", "n", "c"]);
          check(this.#phase === "HANDSHAKE", "KEY_CHANGE_BLOCKED");
          const expected = this.#role === "i" ? 2 : 1;
          check(frame.n === expected && this.#step === (this.#role === "i" ? 1 : 0), "HANDSHAKE_ORDER");
          const payload = this.#noise.recv(decode64(frame.c, 1024));
          this.#validatePayload(payload);
          payload.fill(0);
          this.#step++;
          if (this.#role === "r") this.#emit({ ...this.#base("noise"), n: 2, c: encode64(this.#noise.send(this.#payload())) });
          await this.#finishHandshake();
        } else if (frame.t === "headers") {
          exact(frame, ["v", "t", "r", "from", "sid", "control", "chat"]);
          check(this.#phase === "CONFIRMING" && !this.#remoteHeaders && frame.sid === this.#sid, "KEY_CHANGE_BLOCKED");
          this.#remoteHeaders = { control: frame.control, chat: frame.chat };
          for (const kind of ["control", "chat"]) {
            const header = decode64(frame[kind], 24);
            check(header.length === 24);
            this.#rx[kind] = libsodium_wrappers_default.crypto_secretstream_xchacha20poly1305_init_pull(header, this.#rxKeys[kind]);
            this.#rxKeys[kind].fill(0);
            delete this.#rxKeys[kind];
          }
          this.#control({ op: "confirm", headers: this.#headerBinding() });
        } else if (frame.t === "record") {
          exact(frame, ["v", "t", "r", "from", "sid", "kind", "seq", "c"]);
          check(this.#remoteHeaders && frame.sid === this.#sid && ["control", "chat"].includes(frame.kind), "SESSION_BINDING_FAILED");
          const kind = frame.kind;
          check(Number.isSafeInteger(frame.seq) && frame.seq === this.#received[kind], "REPLAY_OR_ORDER");
          check(frame.seq < (kind === "chat" ? 100 : 16), "RECORD_LIMIT");
          if (kind === "chat") check(this.#phase === "READY", "NOT_VERIFIED");
          const opened = libsodium_wrappers_default.crypto_secretstream_xchacha20poly1305_pull(this.#rx[kind], decode64(frame.c, 4400), this.#aad(kind, frame.from, frame.seq));
          check(opened !== false, "AUTHENTICATION_FAILED");
          try {
            if (kind === "chat") {
              check(opened.tag === libsodium_wrappers_default.crypto_secretstream_xchacha20poly1305_TAG_REKEY, "INVALID_TAG");
              const text = unpack(opened.message);
              this.#received.chat++;
              this.#events.push({ type: "message", text, sequence: frame.seq });
            } else {
              check(opened.message.length <= 1024);
              const value = JSON.parse(dec.decode(opened.message));
              if (value.op === "confirm") {
                exact(value, ["op", "headers"]);
                check(!this.#confirmed && frame.seq === 0 && opened.tag === libsodium_wrappers_default.crypto_secretstream_xchacha20poly1305_TAG_REKEY, "CONFIRMATION_ORDER");
                check(JSON.stringify(value.headers) === JSON.stringify(this.#headerBinding()), "HEADER_BINDING_FAILED");
                this.#confirmed = true;
              } else if (value.op === "compared") {
                exact(value, ["op", "fingerprint"]);
                check(this.#confirmed && !this.#peerCompared && value.fingerprint === this.#fingerprint && opened.tag === libsodium_wrappers_default.crypto_secretstream_xchacha20poly1305_TAG_REKEY, "COMPARISON_ORDER");
                this.#peerCompared = true;
              } else if (value.op === "close") {
                exact(value, ["op"]);
                check(this.#confirmed && opened.tag === libsodium_wrappers_default.crypto_secretstream_xchacha20poly1305_TAG_FINAL, "INVALID_FINAL");
                this.#received.control++;
                this.#events.push({ type: "closed", clean: true });
                this.abort("CLOSED");
                return this.drain();
              } else throw new Error("INVALID_CONTROL");
              this.#received.control++;
              this.#state();
            }
          } finally {
            opened.message.fill(0);
          }
        } else throw new Error("INVALID_FRAME");
        return this.drain();
      } catch (error) {
        this.abort();
        throw error;
      }
    }
    compare(peerFingerprint) {
      this.#alive();
      check(this.#phase === "COMPARE" && this.#confirmed && !this.#compared, "COMPARISON_ORDER");
      const value = typeof peerFingerprint === "string" ? peerFingerprint.replace(/\s/g, "").toLowerCase() : "";
      if (!HEX64.test(value) || value !== this.#fingerprint) {
        this.abort();
        throw new Error("FINGERPRINT_MISMATCH");
      }
      this.#compared = true;
      this.#control({ op: "compared", fingerprint: this.#fingerprint });
      this.#state();
      return this.drain();
    }
    send(text) {
      this.#alive();
      check(this.#phase === "READY", "NOT_VERIFIED");
      const bytes = pack(text);
      try {
        this.#push("chat", bytes);
      } catch (error) {
        this.abort();
        throw error;
      } finally {
        bytes.fill(0);
      }
      return this.drain();
    }
    close() {
      this.#alive();
      if (this.#confirmed) this.#control({ op: "close" }, true);
      const frames = this.#out;
      this.#out = [];
      this.abort("CLOSED");
      return { frames, events: [], snapshot: this.snapshot };
    }
    abort(state = "FAILED") {
      this.#phase = state;
      this.#compared = false;
      this.#peerCompared = false;
      this.#confirmed = false;
      wipeNoise(this.#noise);
      this.#noise = null;
      for (const key of Object.values(this.#rxKeys)) key.fill(0);
      this.#rxKeys = {};
      this.#tx = {};
      this.#rx = {};
      this.#out = [];
      this.#localHeaders = null;
      this.#remoteHeaders = null;
      this.#fingerprint = null;
      this.#sid = null;
    }
  };

  // src/worker.mjs
  var session = null;
  var used = false;
  var pending = 0;
  var pendingBytes = 0;
  var queue = Promise.resolve();
  var lifetime = null;
  var safeErrors = /* @__PURE__ */ new Set(["INVALID_INVITE", "INVALID_ROLE", "HANDSHAKE_ORDER", "KEY_CHANGE_BLOCKED", "CONTEXT_MISMATCH", "SESSION_BINDING_FAILED", "REPLAY_OR_ORDER", "NOT_VERIFIED", "AUTHENTICATION_FAILED", "COMPARISON_ORDER", "FINGERPRINT_MISMATCH", "SESSION_EXPIRED", "SESSION_CLOSED", "MESSAGE_TOO_LARGE", "EMPTY_MESSAGE", "RECORD_LIMIT"]);
  var post = (id, data) => self.postMessage({ id, ...data });
  self.onmessage = ({ data }) => {
    const size = new TextEncoder().encode(JSON.stringify(data)).length;
    if (++pending > 16 || (pendingBytes += size) > 65536) {
      session?.abort();
      post(data?.id, { error: "QUEUE_LIMIT", fatal: true });
      self.close();
      return;
    }
    queue = queue.then(async () => {
      const { id, op } = data;
      try {
        if (op === "init") {
          if (used) throw new Error("SESSION_CLOSED");
          used = true;
          const secret = data.role === "i" ? await newInvite() : data.secret;
          session = await Session.create(secret, data.role);
          lifetime = setTimeout(() => {
            session.abort();
            post(null, { error: "SESSION_EXPIRED", fatal: true });
            self.close();
          }, MAX_SESSION_MS);
          post(id, { ...session.drain(), invite: data.role === "i" ? secret : void 0 });
        } else {
          if (!session) throw new Error("SESSION_CLOSED");
          let result;
          if (op === "start") result = session.start();
          else if (op === "receive") result = await session.receive(data.frame);
          else if (op === "compare") result = session.compare(data.fingerprint);
          else if (op === "send") result = session.send(data.text);
          else if (op === "close") result = session.close();
          else throw new Error("INVALID_FRAME");
          post(id, result);
          if (["CLOSED", "FAILED"].includes(result.snapshot.state)) {
            clearTimeout(lifetime);
            self.close();
          }
        }
      } catch (error) {
        const recoverable = ["EMPTY_MESSAGE", "MESSAGE_TOO_LARGE", "NOT_VERIFIED"].includes(error.message);
        if (!recoverable) {
          session?.abort();
          clearTimeout(lifetime);
        }
        post(id, { error: safeErrors.has(error.message) ? error.message : "AUTHENTICATION_FAILED", fatal: !recoverable });
        if (!recoverable) self.close();
      } finally {
        pending--;
        pendingBytes -= size;
      }
    });
  };
})();
