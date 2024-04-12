import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import InvoiceForm from "../../components/InvoiceForm";

describe("InvoiceForm", () => {
  const mockNavigate = jest.fn();
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
  }));

  const initialValues = {
    companyName: "Example Co.",
    billingDate: new Date("2021-01-01"),
    dueDate: new Date("2021-01-15"),
    author: "Jane Doe",
    items: [
      {
        itemName: "Item 1",
        quantity: 2,
        unit: "pcs",
        unitPrice: 100,
        taxRate: 0.1,
        amount: 220,
      },
    ],
  };

  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(
      <Router>
        <InvoiceForm initialValues={initialValues} onSubmit={mockOnSubmit} />
      </Router>
    );
  });

  it("renders correctly with initial values", () => {
    expect(screen.getByDisplayValue("Example Co.")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2021-01-01")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2021-01-15")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Jane Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Item 1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
    expect(screen.getByDisplayValue("pcs")).toBeInTheDocument();
    expect(screen.getByDisplayValue("100")).toBeInTheDocument();
    expect(screen.getByDisplayValue("0.1")).toBeInTheDocument();
  });

  it("adds a new invoice item", () => {
    fireEvent.click(screen.getByText("明細を追加"));
    const items = screen.getAllByDisplayValue("");
    expect(items.length).toBe(2);
  });

  it("updates an item name", () => {
    fireEvent.change(screen.getByDisplayValue("Item 1"), {
      target: { value: "Updated Item" },
    });
    expect(screen.getByDisplayValue("Updated Item")).toBeInTheDocument();
  });
});
