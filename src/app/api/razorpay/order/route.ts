import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { amount } = await request.json(); // amount in INR
    
    const keyId = "rzp_test_THKA9eZTARgpKw";
    const keySecret = "R3xU2LJmVSiVrsnYUSYKuf82";
    
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // in paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      }),
    });
    
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: data.error || "Failed to create order" }, { status: response.status });
    }
    
    return NextResponse.json({ orderId: data.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}
