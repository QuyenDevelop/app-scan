import { addServiceApi, shipmentApi } from "@api";
import { Alert, ScreenUtils } from "@helpers";
import { useShow } from "@hooks";
import { AddServiceInfo, ShipmentAddServiceResponse } from "@models";
import { goToAddServicePhotosScreen } from "@navigation";
import { Button, NoData, translate } from "@shared";
import { Themes } from "@themes";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { AddServiceShipmentResponse } from "src/models/Response/ServiceResponse";
import { ServiceInfo } from "./ServiceInfo";
import styles from "./styles";
interface Props {
  addServices: Array<ShipmentAddServiceResponse>;
  shipmentNumber: string;
  shipmentId: string;
}
export const AddServicesTab: FunctionComponent<Props> = props => {
  const { addServices, shipmentNumber, shipmentId } = props;
  const [isLoading, showLoading, hideLoading] = useShow();
  const [isLoadingAddService, showLoadingAddService, hideLoadingAddService] =
    useShow();
  const [listService, setListService] = useState<
    Array<AddServiceShipmentResponse>
  >([]);
  const [selectService, setSelectedService] = useState<Array<AddServiceInfo>>(
    [],
  );

  const fetchShipmentService = () => {
    showLoading();
    addServiceApi
      .getAll()
      ?.then(response => {
        const responseServices = response?.data || [];
        const headService: Array<AddServiceShipmentResponse> = [];
        const footerService: Array<AddServiceShipmentResponse> = [];
        responseServices.forEach(service => {
          const isAdded = addServices.findIndex(
            s => s.CargoAddServiceId === service.Id,
          );
          if (isAdded > -1) {
            headService.push({
              ...service,
              IsProcessed: addServices[isAdded].IsProcessed,
              imagesCargoAddServices:
                addServices[isAdded].imagesCargoAddServices,
            });
          } else {
            footerService.push(service);
          }
          return service;
        });

        headService.sort(a => {
          return a.IsProcessed ? -1 : 1;
        });

        setListService([...headService, ...footerService]);
      })
      .finally(() => {
        hideLoading();
      });
  };

  useEffect(() => {
    const headService: Array<AddServiceShipmentResponse> = [];
    const footerService: Array<AddServiceShipmentResponse> = [];
    setListService(services => {
      services.forEach(service => {
        const isAdded = addServices.findIndex(
          s => s.CargoAddServiceId === service.Id,
        );
        if (isAdded > -1) {
          headService.push({
            ...service,
            IsProcessed: addServices[isAdded].IsProcessed,
            imagesCargoAddServices: addServices[isAdded].imagesCargoAddServices,
          });
        } else {
          footerService.push(service);
        }
        return service;
      });

      headService.sort(a => {
        return a.IsProcessed ? -1 : 1;
      });
      return [...headService, ...footerService];
    });
  }, [addServices]);

  useEffect(() => {
    fetchShipmentService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddServices = () => {
    const pendingService = listService.filter(
      service =>
        service.IsProcessed === false && service.IsRequiredImage === false,
    );
    const newPendingService = pendingService.map(service => ({
      shipmentCargorAddServiceId: service.Id,
      shipmentCargorAddServiceCode: service.Code,
    }));
    showLoadingAddService();
    shipmentApi
      .updateAddService({
        shipmentId: shipmentId,
        shipmentNumber: shipmentNumber,
        shipmentCargoAddServiceViewModels: [
          ...newPendingService,
          ...selectService,
        ],
      })
      ?.then(response => {
        const serviceSuccess: Array<string> = response.data || [];
        setSelectedService(services =>
          services.filter(
            service =>
              !serviceSuccess.includes(service.shipmentCargorAddServiceId),
          ),
        );
        setListService(services =>
          services.map(service => {
            if (serviceSuccess.includes(service.Id)) {
              return { ...service, IsProcessed: true };
            }
            return service;
          }),
        );
      })
      .finally(() => {
        hideLoadingAddService();
      });
  };

  const isSelectedService = (serviceId: string) => {
    return (
      selectService.filter(
        service => service.shipmentCargorAddServiceId === serviceId,
      ).length > 0
    );
  };

  const selectedService = (serviceSelect: AddServiceShipmentResponse) => {
    const isSelected = isSelectedService(serviceSelect.Id);

    if (isSelected) {
      setSelectedService(services =>
        services.filter(
          service => service.shipmentCargorAddServiceId !== serviceSelect.Id,
        ),
      );
    } else {
      setSelectedService(services => [
        ...services,
        {
          shipmentCargorAddServiceId: serviceSelect.Id,
          shipmentCargorAddServiceCode: serviceSelect.Code,
        },
      ]);
    }
  };

  const updateIsProcess = (serviceId: string, value: boolean) => {
    setListService(services =>
      services.map(service => {
        if (service.Id === serviceId) {
          return { ...service, IsProcessed: value };
        }
        return service;
      }),
    );
  };

  const viewImage = useCallback(
    (shipment: string, serviceCode: string, index: number) => {
      const images = listService[index].imagesCargoAddServices;
      if (images.length === 0) {
        Alert.warning("warning.noPhotos");
      } else {
        goToAddServicePhotosScreen({
          shipment: shipment,
          service: serviceCode,
          photosService: images,
        });
      }
    },
    [listService],
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: AddServiceShipmentResponse;
    index: number;
  }) => {
    const isSelected = isSelectedService(item.Id);
    const onViewImage = () => {
      viewImage(shipmentNumber, item.Code, index);
    };
    return (
      <ServiceInfo
        item={item}
        isSelected={isSelected}
        onSelect={selectedService}
        shipment={shipmentNumber}
        shipmentId={shipmentId}
        updateIsProcess={updateIsProcess}
        viewImage={onViewImage}
      />
    );
  };

  return (
    <View style={styles.tabContainer}>
      {isLoading ? (
        <View style={styles.loadingView}>
          <ActivityIndicator color={Themes.colors.collGray40} />
        </View>
      ) : (
        <FlatList
          data={listService}
          keyExtractor={item => item.Id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<NoData />}
          ListFooterComponent={
            <Button
              title={translate("button.addService")}
              buttonStyle={styles.addServiceBtn}
              buttonChildStyle={{
                backgroundColor:
                  selectService.length === 0
                    ? Themes.colors.collGray40
                    : Themes.colors.bg,
                minWidth: ScreenUtils.calculatorWidth(250),
              }}
              onPress={onAddServices}
              isDisable={selectService.length === 0}
              isLoading={isLoadingAddService}
            />
          }
        />
      )}
    </View>
  );
};
