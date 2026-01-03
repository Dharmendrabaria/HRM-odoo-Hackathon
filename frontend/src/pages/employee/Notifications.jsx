import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/common/Card";
import { NOTIFICATIONS } from "../../data/dummyData";
import { useAuth } from "../../context/AuthContext";
import { Bell, CheckCircle } from "lucide-react";

const EmployeeNotifications = () => {
  const { user } = useAuth();
  const myNotifications = NOTIFICATIONS.filter(n => n.userId === user?.id);

  return (
    <PageWrapper>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <button className="text-sm text-blue-600 hover:underline">Mark all as read</button>
      </div>

      <div className="space-y-4 max-w-3xl">
        {myNotifications.length > 0 ? (
          myNotifications.map((note) => (
            <Card key={note.id} className={`flex gap-4 p-4 ${!note.read ? 'border-l-4 border-l-blue-500 bg-blue-50/50' : 'border-l-4 border-l-gray-200'}`}>
              <div className={`p-2 rounded-full h-fit flex-shrink-0 ${!note.read ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                <Bell size={20} />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{note.message}</p>
                <p className="text-sm text-gray-500 mt-1">{note.date}</p>
              </div>
              {!note.read && (
                 <button className="text-gray-400 hover:text-green-600 transition-colors" title="Mark as read">
                    <CheckCircle size={18} />
                 </button>
              )}
            </Card>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
             <Bell size={48} className="mx-auto text-gray-200 mb-4" />
             <p>No new notifications</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default EmployeeNotifications;
