import { SettingsContactTab } from "@/components/settings-tabs/contact-tab";
import { SettingsInfoTab } from "@/components/settings-tabs/info-tab";
import { SettingsIntegrationsTab } from "@/components/settings-tabs/integrations-tab";
import { SettingsProfileTab } from "@/components/settings-tabs/profile-tab";
import { SettingsSeatsTab } from "@/components/settings-tabs/seats-tab";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function Home() {
  return (
    <main className="px-6 py-10 lg:pl-[116px] lg:pr-[120px] lg:py-[100px]">
      <h1 className="font-[600] text-[28px] leading-7 mb-8 md:text-[36px] md:leading-[36px]">
        Settings
      </h1>

      <SettingsTabs />
    </main>
  );
}

const SettingsTabs = () => {
  return (
    <Tabs defaultValue="info">
      <div className="overflow-x-auto mb-8">
        <TabsList>
          <TabsTrigger value="profile" className="px-4 py-[6px]">
            Your Profile
          </TabsTrigger>
          <TabsTrigger value="info" className="px-4 py-[6px]">
            Company Info
          </TabsTrigger>
          <TabsTrigger value="seats" className="px-4 py-[6px]">
            Manage Seats
          </TabsTrigger>
          <TabsTrigger value="contact" className="px-4 py-[6px]">
            Do Not Contact
          </TabsTrigger>
          <TabsTrigger value="integrations" className="px-4 py-[6px]">
            Integrations
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="profile">
        <SettingsProfileTab />
      </TabsContent>
      <TabsContent value="info">
        <SettingsInfoTab />
      </TabsContent>
      <TabsContent value="seats">
        <SettingsSeatsTab />
      </TabsContent>
      <TabsContent value="contact">
        <SettingsContactTab />
      </TabsContent>
      <TabsContent value="integrations">
        <SettingsIntegrationsTab />
      </TabsContent>
    </Tabs>
  );
};
