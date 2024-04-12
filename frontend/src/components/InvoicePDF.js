import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";

Font.register({
  family: "NotoSansJP",
  src: "/fonts/NotoSerifJP-Regular.otf",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: "NotoSansJP",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "NotoSansJP",
    color: "#555",
  },
  details: {
    fontFamily: "NotoSansJP",
  },
  footer: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontFamily: "NotoSansJP",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    fontFamily: "NotoSansJP",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    fontFamily: "NotoSansJP",
  },
  tableColHeader: {
    width: "16.67%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f3f3f3",
    fontFamily: "NotoSansJP",
  },
  tableCol: {
    width: "16.67%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontFamily: "NotoSansJP",
  },
  tableCellHeader: {
    margin: "auto",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "NotoSansJP",
  },
  tableCell: {
    margin: "auto",
    fontSize: 10,
    fontFamily: "NotoSansJP",
  },
});

// 請求書データをpropsで受け取る
const InvoicePDF = ({ invoiceData }) => {
  const renderTableRow = (item, index) => (
    <View style={styles.tableRow} key={index}>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{item.itemName}</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{item.quantity}</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{item.unit}</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{item.unitPrice}</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{item.taxRate}</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>
          {item.quantity * item.unitPrice * item.taxRate} 円
        </Text>
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>請求書</Text>
          <Text style={styles.subtitle}>No. {invoiceData.id}</Text>
        </View>

        <View style={styles.details}>
          <Text>請求日: {invoiceData.billingDate.toLocaleDateString()}</Text>
          <Text>お支払い期限: {invoiceData.dueDate.toLocaleDateString()}</Text>
          <Text>取引先: {invoiceData.companyName}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>品目・品名</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>数量</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>単位</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>単価</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>税率</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>金額</Text>
            </View>
          </View>
          {invoiceData.items.map(renderTableRow)}
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
