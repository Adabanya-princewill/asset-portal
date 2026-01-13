// Utility helpers to export assets to CSV or JSON

const flattenAsset = (asset = {}) => ({
  assetTag: asset.assetTag || "",
  assetName: asset.assetName || "",
  category: asset.category?.categoryName || "",
  location: asset.location?.locationName || "",
  department: asset.department?.departmentName || "",
  purchasePrice: asset.purchasePrice ?? "",
  currentValue: asset.currentValue ?? "",
  approvalStatus: asset.approvalStatus || "",
  assetStatus: asset.assetStatus || "",
  condition: asset.condition || "",
  acquisitionDate: asset.acquisitionDate || "",
  warrantyExpirationDate: asset.warrantyExpirationDate || "",
  createdBy: asset.createdBy?.username || "",
  assignedTo: asset.user?.username || "",
  assignedEmployeeId: asset.user?.employeeId || "",
  barcode: asset.barcode || "",
  description: asset.description || "",
});

const csvEscape = (value) => {
  if (value === null || value === undefined) return "";
  const str = String(value);
  // Escape double quotes
  const escaped = str.replace(/"/g, '""');
  // Wrap fields containing commas/newlines/quotes in double quotes
  return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
};

const toCSV = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(",")];
  for (const row of rows) {
    const line = headers.map((h) => csvEscape(row[h]));
    lines.push(line.join(","));
  }
  return lines.join("\n");
};

const downloadBlob = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export const exportAssetsToCSV = (assets = [], filename = "assets.csv") => {
  const rows = assets.map(flattenAsset);
  const csv = toCSV(rows);
  downloadBlob(csv, filename, "text/csv;charset=utf-8;");
};

export const exportAssetsToJSON = (assets = [], filename = "assets.json") => {
  const rows = assets.map(flattenAsset);
  const json = JSON.stringify(rows, null, 2);
  downloadBlob(json, filename, "application/json");
};

export const exportAssetToCSV = (asset, filename = "asset.csv") =>
  exportAssetsToCSV([asset], filename);

export const exportAssetToJSON = (asset, filename = "asset.json") => {
  const row = flattenAsset(asset);
  downloadBlob(JSON.stringify(row, null, 2), filename, "application/json");
};

export default {
  exportAssetsToCSV,
  exportAssetToCSV,
};
