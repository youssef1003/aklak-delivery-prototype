import { Users, UserPlus, Shield, Edit2, Trash2 } from 'lucide-react';
import SectionHeader from '../../components/shared/SectionHeader';

export default function Staff() {
  const staffMembers = [
    { id: 1, name: 'يوسف العتيبي', email: 'youssef@aklak.demo', role: 'owner', roleName: 'مالك', status: 'active' },
    { id: 2, name: 'أحمد محمود', email: 'ahmed@aklak.demo', role: 'manager', roleName: 'مدير فرع', status: 'active' },
    { id: 3, name: 'سارة خالد', email: 'sara@aklak.demo', role: 'cashier', roleName: 'كاشير', status: 'pending' },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="إدارة الموظفين" 
        subtitle="دعوة الموظفين وإدارة صلاحياتهم في لوحة تحكم المطعم"
        action={{ label: 'دعوة موظف', icon: <UserPlus size={16} />, onClick: () => alert('جاري التطوير في هذا الديمو') }}
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-gray-50/80 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">الموظف</th>
                <th className="px-6 py-4">البريد الإلكتروني</th>
                <th className="px-6 py-4">الصلاحية</th>
                <th className="px-6 py-4">الحالة</th>
                <th className="px-6 py-4">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {staffMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <span className="font-bold text-gray-900">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500" dir="ltr">{member.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <Shield size={14} className={member.role === 'owner' ? 'text-primary' : 'text-gray-400'} />
                      {member.roleName}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {member.status === 'active' ? 'نشط' : 'في انتظار القبول'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"><Edit2 size={16} /></button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" disabled={member.role === 'owner'}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
