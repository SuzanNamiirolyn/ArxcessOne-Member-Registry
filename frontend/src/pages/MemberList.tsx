import { useState } from "react";
import type { Member } from "../types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Temporary mock data
const initialMock: Member[] = [
  { id: 1, fullName: "John Doe", nationalId: "ID001", phone: "+256700000000", joinDate: "2026-01-15", status: "ACTIVE" },
  { id: 2, fullName: "Jane Smith", nationalId: "ID002", phone: "+256700111222", joinDate: "2026-03-20", status: "ACTIVE" },
  { id: 3, fullName: "Bob Brown", nationalId: "ID003", phone: "", joinDate: "2025-11-05", status: "INACTIVE" },
];

export function MemberList() {
  const [members] = useState<Member[]>(initialMock);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filtered = members.filter(m => {
    const matchSearch = search === "" ||
      m.fullName.toLowerCase().includes(search.toLowerCase()) ||
      m.nationalId.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const total = members.length;
  const active = members.filter(m => m.status === "ACTIVE").length;
  const inactive = total - active;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Member Registry</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Members</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">{total}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Active</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold text-green-600">{active}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Inactive</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold text-slate-500">{inactive}</CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4">
        <Input placeholder="Search by name or ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
        <Select value={statusFilter} onValueChange={(value) => value && setStatusFilter(value)}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>National ID</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map(m => (
            <TableRow key={m.id}>
              <TableCell className="font-medium">{m.fullName}</TableCell>
              <TableCell>{m.nationalId}</TableCell>
              <TableCell>{m.phone || "—"}</TableCell>
              <TableCell>{m.joinDate}</TableCell>
              <TableCell>
                <Badge variant={m.status === "ACTIVE" ? "default" : "secondary"}>
                  {m.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}