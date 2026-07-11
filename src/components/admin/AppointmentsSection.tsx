import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MoreVertical,
  Check,
  X,
  Clock,
  Calendar,
  User,
  Mail,
  MessageSquare,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Appointment {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  notes: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    date: "2024-01-20",
    time: "10:00 AM",
    duration: "30 min",
    type: "Career Consultation",
    notes: "Looking for advice on transitioning to software development",
    status: "pending",
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah@example.com",
    date: "2024-01-21",
    time: "2:00 PM",
    duration: "1 hour",
    type: "Technical Discussion",
    notes: "Want to discuss React architecture",
    status: "confirmed",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    date: "2024-01-18",
    time: "11:00 AM",
    duration: "30 min",
    type: "Portfolio Review",
    notes: "Review of my current portfolio",
    status: "completed",
  },
  {
    id: "4",
    name: "Emily Chen",
    email: "emily@example.com",
    date: "2024-01-19",
    time: "3:00 PM",
    duration: "30 min",
    type: "Code Review",
    notes: "Need feedback on my React project",
    status: "cancelled",
  },
];

const AppointmentsSection = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.type.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    return matchesSearch && apt.status === activeTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "confirmed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "";
    }
  };

  const handleUpdateStatus = (id: string, status: Appointment["status"]) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status } : apt
      )
    );
  };

  const statusCounts = {
    all: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    completed: appointments.filter((a) => a.status === "completed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="all" className="gap-2">
            All <Badge variant="secondary">{statusCounts.all}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="gap-2">
            Pending <Badge variant="secondary">{statusCounts.pending}</Badge>
          </TabsTrigger>
          <TabsTrigger value="confirmed" className="gap-2">
            Confirmed <Badge variant="secondary">{statusCounts.confirmed}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="gap-2">
            Completed <Badge variant="secondary">{statusCounts.completed}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filteredAppointments.map((apt, index) => (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left: User Info */}
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{apt.name}</h4>
                            <Badge className={`text-xs ${getStatusColor(apt.status)}`}>
                              {apt.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            {apt.email}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {apt.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {apt.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Video className="w-3 h-3" />
                              {apt.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Middle: Type & Notes */}
                      <div className="flex-1 lg:max-w-md">
                        <Badge variant="outline" className="mb-2">
                          {apt.type}
                        </Badge>
                        {apt.notes && (
                          <p className="text-sm text-muted-foreground flex items-start gap-1">
                            <MessageSquare className="w-3 h-3 mt-1 flex-shrink-0" />
                            {apt.notes}
                          </p>
                        )}
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2">
                        {apt.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => handleUpdateStatus(apt.id, "confirmed")}
                            >
                              <Check className="w-4 h-4" />
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1 text-destructive hover:text-destructive"
                              onClick={() => handleUpdateStatus(apt.id, "cancelled")}
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </Button>
                          </>
                        )}
                        {apt.status === "confirmed" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1"
                            onClick={() => handleUpdateStatus(apt.id, "completed")}
                          >
                            <Check className="w-4 h-4" />
                            Mark Complete
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                            <DropdownMenuItem>Reschedule</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredAppointments.length === 0 && (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No appointments found</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentsSection;
