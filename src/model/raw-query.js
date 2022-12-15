const query = {};

query.prosesIncrement = `SELECT nik + 1 as lastNik FROM karyawan  ORDER BY nik DESC LIMIT 1`

module.exports = query;