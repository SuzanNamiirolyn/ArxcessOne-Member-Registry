import { useForm } from "react-hook-form";
import type { Member } from "../types";
import { MemberForm } from "../components/MemberForm";
import { useNavigate } from "react-router-dom";

// Temporary mock storage
const mockMembers: Member[] = [];

export function AddMember() {
  const navigate = useNavigate();
  const form = useForm<Member>({
    defaultValues: {
      status: "ACTIVE",
      joinDate: new Date().toISOString().split('T')[0]
    }
  });

  const handleSubmit = (data: Member) => {
    mockMembers.push({ ...data, id: Date.now() });
    console.log("Saved:", data);
    alert("✅ Member saved! (mock)");
    navigate("/");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Register New Member</h1>
      <MemberForm form={form} onSubmit={handleSubmit} />
    </div>
  );
}