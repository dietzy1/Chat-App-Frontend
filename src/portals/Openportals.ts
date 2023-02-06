export function openAccountFunc(
  setOpenAccount: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>
) {
  setOpenAccount(true);
  setOpenSettings(false);
}

export function openSettingsFunc(
  setOpenAccount: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>
) {
  console.log("Fuck det hele mand");
  setOpenAccount(false);
  setOpenSettings(true);
}
