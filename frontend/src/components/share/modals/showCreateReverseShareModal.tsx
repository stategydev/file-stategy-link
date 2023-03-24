import {
  Button,
  Col,
  Grid,
  Group,
  NumberInput,
  Select,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useModals } from "@mantine/modals";
import { ModalsContextProps } from "@mantine/modals/lib/context";
import shareService from "../../../services/share.service";
import { getExpirationPreview } from "../../../utils/date.util";
import toast from "../../../utils/toast.util";
import FileSizeInput from "../FileSizeInput";
import showCompletedReverseShareModal from "./showCompletedReverseShareModal";

const showCreateReverseShareModal = (
  modals: ModalsContextProps,
  showSendEmailNotificationOption: boolean,
  getReverseShares: () => void
) => {
  return modals.openModal({
    title: <Title order={4}>Create reverse share</Title>,
    children: (
      <Body
        showSendEmailNotificationOption={showSendEmailNotificationOption}
        getReverseShares={getReverseShares}
      />
    ),
  });
};

const Body = ({
  getReverseShares,
  showSendEmailNotificationOption,
}: {
  getReverseShares: () => void;
  showSendEmailNotificationOption: boolean;
}) => {
  const modals = useModals();

  const form = useForm({
    initialValues: {
      maxShareSize: 104857600,
      maxUseCount: 1,
      sendEmailNotification: false,
      expiration_num: 1,
      expiration_unit: "-days",
    },
  });
  return (
    <Group>
      <form
        onSubmit={form.onSubmit(async (values) => {
          shareService
            .createReverseShare(
              values.expiration_num + values.expiration_unit,
              values.maxShareSize,
              values.maxUseCount,
              values.sendEmailNotification
            )
            .then(({ link }) => {
              modals.closeAll();
              showCompletedReverseShareModal(modals, link, getReverseShares);
            })
            .catch(toast.axiosError);
        })}
      >
        <Stack align="stretch">
          <div>
            <Grid align={form.errors.link ? "center" : "flex-end"}>
              <Col xs={6}>
                <NumberInput
                  min={1}
                  max={99999}
                  precision={0}
                  variant="filled"
                  label="Share expiration"
                  {...form.getInputProps("expiration_num")}
                />
              </Col>
              <Col xs={6}>
                <Select
                  {...form.getInputProps("expiration_unit")}
                  data={[
                    // Set the label to singular if the number is 1, else plural
                    {
                      value: "-minutes",
                      label:
                        "Minute" + (form.values.expiration_num == 1 ? "" : "s"),
                    },
                    {
                      value: "-hours",
                      label:
                        "Hour" + (form.values.expiration_num == 1 ? "" : "s"),
                    },
                    {
                      value: "-days",
                      label:
                        "Day" + (form.values.expiration_num == 1 ? "" : "s"),
                    },
                    {
                      value: "-weeks",
                      label:
                        "Week" + (form.values.expiration_num == 1 ? "" : "s"),
                    },
                    {
                      value: "-months",
                      label:
                        "Month" + (form.values.expiration_num == 1 ? "" : "s"),
                    },
                  ]}
                />
              </Col>
            </Grid>
            <Text
              mt="sm"
              italic
              size="xs"
              sx={(theme) => ({
                color: theme.colors.gray[6],
              })}
            >
              {getExpirationPreview("reverse share", form)}
            </Text>
          </div>
          <FileSizeInput
            label="Max share size"
            value={form.values.maxShareSize}
            onChange={(number) => form.setFieldValue("maxShareSize", number)}
          />
          <NumberInput
            min={1}
            max={1000}
            precision={0}
            variant="filled"
            label="Max use count"
            description="The maximum number of times this reverse share link can be used"
            {...form.getInputProps("maxUseCount")}
          />
          {showSendEmailNotificationOption && (
            <Switch
              mt="xs"
              labelPosition="left"
              label="Send email notification"
              description="Send an email notification when a share is created with this reverse share link"
              {...form.getInputProps("sendEmailNotification", {
                type: "checkbox",
              })}
            />
          )}

          <Button mt="md" type="submit">
            Create
          </Button>
        </Stack>
      </form>
    </Group>
  );
};

export default showCreateReverseShareModal;
