import {
  UserGroupIcon,
  CalendarIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-primary-dark">
        Dashboard Overview
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Students
            </CardTitle>
            <UserGroupIcon className="h-4 w-4 text-brand-blue-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-green-500 mt-1">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Classes
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-brand-purple-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-gray-400 mt-1">2 scheduled today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pending Reviews
            </CardTitle>
            <ClipboardDocumentCheckIcon className="h-4 w-4 text-brand-yellow-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-gray-400 mt-1">Practice submissions</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity or other sections can go here */}
    </div>
  );
}
